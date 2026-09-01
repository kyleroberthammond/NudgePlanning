export interface User {
  id: number
  fullName: string | null
  email: string
  createdAt: string
  updatedAt: string | null
  initials: string
}

export interface AuthPayload {
  token: string
  user: User
}
