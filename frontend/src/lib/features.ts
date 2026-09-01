import { api } from './api'
import type { Feature, FeatureDetail, FeatureInput } from '../types'

export const featuresApi = {
  list: (projectId: number) => api.get<Feature[]>(`/projects/${projectId}/features`),
  get: (id: number) => api.get<FeatureDetail>(`/features/${id}`),
  create: (projectId: number, input: FeatureInput) =>
    api.post<Feature>(`/projects/${projectId}/features`, input),
  update: (id: number, input: Partial<FeatureInput>) =>
    api.put<Feature>(`/features/${id}`, input),
  remove: (id: number) => api.delete<void>(`/features/${id}`),
}
