import { api, downloadFile } from './api'
import type { Attachment } from '../types'

export type AttachableParentType = 'feature' | 'task'

function parentPath(type: AttachableParentType, id: number): string {
  return type === 'feature' ? `/features/${id}/attachments` : `/tasks/${id}/attachments`
}

export const attachmentsApi = {
  list: (type: AttachableParentType, id: number) =>
    api.get<Attachment[]>(parentPath(type, id)),
  upload: (type: AttachableParentType, id: number, file: File) => {
    const form = new FormData()
    form.append('file', file)
    return api.postForm<Attachment>(parentPath(type, id), form)
  },
  remove: (id: number) => api.delete<void>(`/attachments/${id}`),
  download: (attachment: Attachment) =>
    downloadFile(`/attachments/${attachment.id}/download`, attachment.filename),
}
