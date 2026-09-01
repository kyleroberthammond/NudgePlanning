import { api } from './api'
import type { Task, TaskDetail, TaskInput } from '../types'

export const tasksApi = {
  list: (featureId: number) => api.get<Task[]>(`/features/${featureId}/tasks`),
  get: (id: number) => api.get<TaskDetail>(`/tasks/${id}`),
  create: (featureId: number, input: TaskInput) =>
    api.post<Task>(`/features/${featureId}/tasks`, input),
  update: (id: number, input: Partial<TaskInput>) => api.put<Task>(`/tasks/${id}`, input),
  remove: (id: number) => api.delete<void>(`/tasks/${id}`),
}
