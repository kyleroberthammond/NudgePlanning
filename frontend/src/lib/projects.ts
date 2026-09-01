import { api } from './api'
import type { Project, ProjectDetail, ProjectInput } from '../types'

export const projectsApi = {
  list: () => api.get<Project[]>('/projects'),
  get: (id: number) => api.get<ProjectDetail>(`/projects/${id}`),
  create: (input: ProjectInput) => api.post<Project>('/projects', input),
  update: (id: number, input: Partial<ProjectInput>) =>
    api.put<Project>(`/projects/${id}`, input),
  remove: (id: number) => api.delete<void>(`/projects/${id}`),
}
