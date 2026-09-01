export interface ApiFieldError {
  field?: string
  message: string
  rule?: string
}

export class ApiError extends Error {
  status: number
  errors: ApiFieldError[]

  constructor(status: number, errors: ApiFieldError[]) {
    super(errors[0]?.message ?? 'Something went wrong')
    this.name = 'ApiError'
    this.status = status
    this.errors = errors
  }
}

export const API_URL =
  (import.meta.env.VITE_API_URL as string | undefined) ?? 'http://localhost:3333/api/v1'
const TOKEN_KEY = 'nudgeplanning.authToken'

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string | null): void {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token)
  } else {
    localStorage.removeItem(TOKEN_KEY)
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken()
  const headers = new Headers(options.headers)
  headers.set('Accept', 'application/json')
  // Leave FormData bodies alone — the browser sets the multipart boundary
  // itself, and overriding Content-Type here would drop it.
  if (options.body && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json')
  }
  if (token) headers.set('Authorization', `Bearer ${token}`)

  const response = await fetch(`${API_URL}${path}`, { ...options, headers })

  const text = await response.text()
  let body: unknown = null
  if (text) {
    try {
      body = JSON.parse(text)
    } catch {
      // Non-JSON response body (e.g. a proxy error page) — leave body null.
    }
  }

  if (!response.ok) {
    const parsed = body as { errors?: ApiFieldError[]; message?: string } | null
    const errors = parsed?.errors ?? [{ message: parsed?.message ?? response.statusText }]
    throw new ApiError(response.status, errors)
  }

  const parsed = body as { data?: T } | T | null
  if (parsed && typeof parsed === 'object' && 'data' in parsed) {
    return (parsed as { data: T }).data
  }
  return parsed as T
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, payload?: unknown) =>
    request<T>(path, {
      method: 'POST',
      body: payload !== undefined ? JSON.stringify(payload) : undefined,
    }),
  put: <T>(path: string, payload?: unknown) =>
    request<T>(path, {
      method: 'PUT',
      body: payload !== undefined ? JSON.stringify(payload) : undefined,
    }),
  delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
  postForm: <T>(path: string, form: FormData) => request<T>(path, { method: 'POST', body: form }),
}

/**
 * Downloads a file from an authenticated endpoint and prompts the browser
 * to save it — a plain `<a href>` can't carry the Authorization header, so
 * this fetches the bytes ourselves and triggers the save via a blob URL.
 */
export async function downloadFile(path: string, filename: string): Promise<void> {
  const token = getToken()
  const headers = new Headers()
  if (token) headers.set('Authorization', `Bearer ${token}`)

  const response = await fetch(`${API_URL}${path}`, { headers })
  if (!response.ok) {
    throw new ApiError(response.status, [{ message: 'Could not download the file.' }])
  }

  const blob = await response.blob()
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}
