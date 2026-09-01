import { useCallback, useEffect, useState } from 'react'
import { tasksApi } from '../lib/tasks'
import { commentsApi } from '../lib/comments'
import { attachmentsApi } from '../lib/attachments'
import type { TaskDetail, TaskInput } from '../types'

export function useTaskDetail(taskId: number) {
  const [detail, setDetail] = useState<TaskDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      setDetail(await tasksApi.get(taskId))
    } catch {
      setError('Could not load this task.')
    } finally {
      setLoading(false)
    }
  }, [taskId])

  useEffect(() => {
    void refresh()
  }, [refresh])

  const updateTask = useCallback(
    async (input: Partial<TaskInput>) => {
      const updated = await tasksApi.update(taskId, input)
      setDetail((current) => (current ? { ...current, task: updated } : current))
      return updated
    },
    [taskId],
  )

  const addComment = useCallback(
    async (body: string) => {
      const comment = await commentsApi.create('task', taskId, body)
      setDetail((current) => (current ? { ...current, comments: [...current.comments, comment] } : current))
    },
    [taskId],
  )

  const deleteComment = useCallback(async (id: number) => {
    await commentsApi.remove(id)
    setDetail((current) =>
      current ? { ...current, comments: current.comments.filter((c) => c.id !== id) } : current,
    )
  }, [])

  const uploadAttachment = useCallback(
    async (file: File) => {
      const attachment = await attachmentsApi.upload('task', taskId, file)
      setDetail((current) =>
        current ? { ...current, attachments: [attachment, ...current.attachments] } : current,
      )
    },
    [taskId],
  )

  const deleteAttachment = useCallback(async (id: number) => {
    await attachmentsApi.remove(id)
    setDetail((current) =>
      current ? { ...current, attachments: current.attachments.filter((a) => a.id !== id) } : current,
    )
  }, [])

  return {
    detail,
    loading,
    error,
    refresh,
    updateTask,
    addComment,
    deleteComment,
    uploadAttachment,
    deleteAttachment,
  }
}
