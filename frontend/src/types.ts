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

/** Shared status vocabulary for projects, features, and tasks. */
export const ITEM_STATUSES = ['not_started', 'in_progress', 'on_hold', 'completed'] as const
export type ItemStatus = (typeof ITEM_STATUSES)[number]

export const ITEM_STATUS_LABELS: Record<ItemStatus, string> = {
  not_started: 'Not Started',
  in_progress: 'In Progress',
  on_hold: 'On Hold',
  completed: 'Completed',
}

/** Fields every trackable item (project/feature/task) shares. */
export interface TrackableItem {
  id: number
  name: string
  startDate: string | null
  dueDate: string | null
  status: ItemStatus
}

export interface TrackableInput {
  name: string
  startDate: string | null
  dueDate: string | null
  status: ItemStatus
}

export interface Project extends TrackableItem {
  createdAt: string
  updatedAt: string | null
}

export type ProjectInput = TrackableInput

export interface Feature extends TrackableItem {
  projectId: number
  releaseId: number | null
  tasksCount?: number
  createdAt: string
  updatedAt: string | null
}

export interface FeatureInput extends TrackableInput {
  releaseId: number | null
}

export interface Task extends TrackableItem {
  featureId: number
  releaseId: number | null
  createdAt: string
  updatedAt: string | null
}

export type TaskInput = FeatureInput

export const RELEASE_STATUSES = ['planned', 'in_progress', 'released'] as const
export type ReleaseStatus = (typeof RELEASE_STATUSES)[number]

export const RELEASE_STATUS_LABELS: Record<ReleaseStatus, string> = {
  planned: 'Planned',
  in_progress: 'In Progress',
  released: 'Released',
}

export interface Release {
  id: number
  name: string
  targetDate: string | null
  status: ReleaseStatus
  projectId: number
  featuresCount?: number
  tasksCount?: number
  createdAt: string
  updatedAt: string | null
}

export interface ReleaseInput {
  name: string
  targetDate: string | null
  status: ReleaseStatus
}

export interface Comment {
  id: number
  body: string
  commentableType: 'feature' | 'task'
  commentableId: number
  createdAt: string
  updatedAt: string | null
  author: { id: number; fullName: string | null; initials: string }
}

export interface Attachment {
  id: number
  filename: string
  mimeType: string
  size: number
  attachableType: 'feature' | 'task'
  attachableId: number
  createdAt: string
  downloadUrl: string
}

export interface ProjectDetail {
  project: Project
  features: Feature[]
  tasks: Task[]
  releases: Release[]
}

export interface FeatureDetail {
  feature: Feature
  project: Project
  tasks: Task[]
  comments: Comment[]
  attachments: Attachment[]
}

export interface TaskDetail {
  task: Task
  feature: Feature
  project: Project
  comments: Comment[]
  attachments: Attachment[]
}

export interface ReleaseDetail {
  release: Release
  project: Project
  features: Feature[]
  tasks: Task[]
}
