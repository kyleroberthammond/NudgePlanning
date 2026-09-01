import { api } from './api'
import type { Release, ReleaseDetail, ReleaseInput } from '../types'

export const releasesApi = {
  list: (projectId: number) => api.get<Release[]>(`/projects/${projectId}/releases`),
  get: (id: number) => api.get<ReleaseDetail>(`/releases/${id}`),
  create: (projectId: number, input: ReleaseInput) =>
    api.post<Release>(`/projects/${projectId}/releases`, input),
  update: (id: number, input: Partial<ReleaseInput>) =>
    api.put<Release>(`/releases/${id}`, input),
  remove: (id: number) => api.delete<void>(`/releases/${id}`),
}
