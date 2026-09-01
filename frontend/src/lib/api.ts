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

const API_URL = (import.meta.env.VITE_API_URL as string | undefined) ?? 'http://localhost:3333/api/v1'
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
  if (options.body) headers.set('Content-Type', 'application/json')
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
}
