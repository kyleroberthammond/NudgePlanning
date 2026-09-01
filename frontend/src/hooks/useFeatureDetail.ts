import { useCallback, useEffect, useState } from 'react'
import { featuresApi } from '../lib/features'
import { tasksApi } from '../lib/tasks'
import { commentsApi } from '../lib/comments'
import { attachmentsApi } from '../lib/attachments'
import type { FeatureDetail, FeatureInput, ItemStatus, TaskInput } from '../types'

export function useFeatureDetail(featureId: number) {
  const [detail, setDetail] = useState<FeatureDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      setDetail(await featuresApi.get(featureId))
    } catch {
      setError('Could not load this feature.')
    } finally {
      setLoading(false)
    }
  }, [featureId])

  useEffect(() => {
    void refresh()
  }, [refresh])

  const updateFeature = useCallback(
    async (input: Partial<FeatureInput>) => {
      const updated = await featuresApi.update(featureId, input)
      setDetail((current) => (current ? { ...current, feature: updated } : current))
      return updated
    },
    [featureId],
  )

  const createTask = useCallback(
    async (input: TaskInput) => {
      await tasksApi.create(featureId, input)
      await refresh()
    },
    [featureId, refresh],
  )

  const updateTask = useCallback(
    async (id: number, input: Partial<TaskInput>) => {
      await tasksApi.update(id, input)
      await refresh()
    },
    [refresh],
  )

  const updateTaskStatus = useCallback(
    async (id: number, status: ItemStatus) => {
      if (!detail) return
      const previous = detail
      setDetail({ ...detail, tasks: detail.tasks.map((t) => (t.id === id ? { ...t, status } : t)) })
      try {
        await tasksApi.update(id, { status })
      } catch {
        setDetail(previous)
        throw new Error('Could not update task status.')
      }
    },
    [detail],
  )

  const deleteTask = useCallback(
    async (id: number) => {
      await tasksApi.remove(id)
      await refresh()
    },
    [refresh],
  )

  const addComment = useCallback(
    async (body: string) => {
      const comment = await commentsApi.create('feature', featureId, body)
      setDetail((current) => (current ? { ...current, comments: [...current.comments, comment] } : current))
    },
    [featureId],
  )

  const deleteComment = useCallback(async (id: number) => {
    await commentsApi.remove(id)
    setDetail((current) =>
      current ? { ...current, comments: current.comments.filter((c) => c.id !== id) } : current,
    )
  }, [])

  const uploadAttachment = useCallback(
    async (file: File) => {
      const attachment = await attachmentsApi.upload('feature', featureId, file)
      setDetail((current) =>
        current ? { ...current, attachments: [attachment, ...current.attachments] } : current,
      )
    },
    [featureId],
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
    updateFeature,
    createTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
    addComment,
    deleteComment,
    uploadAttachment,
    deleteAttachment,
  }
}
