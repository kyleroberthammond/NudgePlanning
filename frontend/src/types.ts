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

export const PROJECT_STATUSES = ['not_started', 'in_progress', 'on_hold', 'completed'] as const
export type ProjectStatus = (typeof PROJECT_STATUSES)[number]

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  not_started: 'Not Started',
  in_progress: 'In Progress',
  on_hold: 'On Hold',
  completed: 'Completed',
}

export interface Project {
  id: number
  name: string
  startDate: string | null
  dueDate: string | null
  status: ProjectStatus
  createdAt: string
  updatedAt: string | null
}

export interface ProjectInput {
  name: string
  startDate: string | null
  dueDate: string | null
  status: ProjectStatus
}
