import { api } from './api'
import type { Comment } from '../types'

export type CommentParentType = 'feature' | 'task'

function parentPath(type: CommentParentType, id: number): string {
  return type === 'feature' ? `/features/${id}/comments` : `/tasks/${id}/comments`
}

export const commentsApi = {
  list: (type: CommentParentType, id: number) => api.get<Comment[]>(parentPath(type, id)),
  create: (type: CommentParentType, id: number, body: string) =>
    api.post<Comment>(parentPath(type, id), { body }),
  remove: (id: number) => api.delete<void>(`/comments/${id}`),
}
