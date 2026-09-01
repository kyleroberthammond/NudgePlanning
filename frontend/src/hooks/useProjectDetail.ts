import { useCallback, useEffect, useState } from 'react'
import { projectsApi } from '../lib/projects'
import { featuresApi } from '../lib/features'
import { releasesApi } from '../lib/releases'
import type { FeatureInput, ItemStatus, ProjectDetail, ProjectInput, ReleaseInput } from '../types'

/**
 * Backs the project detail page: the project's own fields, its features
 * (list/kanban with drag-and-drop status changes), and a summary of its
 * releases. Most mutations just refetch the whole detail payload — only
 * the kanban drag needs an optimistic update to feel instant.
 */
export function useProjectDetail(projectId: number) {
  const [detail, setDetail] = useState<ProjectDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      setDetail(await projectsApi.get(projectId))
    } catch {
      setError('Could not load this project.')
    } finally {
      setLoading(false)
    }
  }, [projectId])

  useEffect(() => {
    void refresh()
  }, [refresh])

  const updateProject = useCallback(
    async (input: Partial<ProjectInput>) => {
      const updated = await projectsApi.update(projectId, input)
      setDetail((current) => (current ? { ...current, project: updated } : current))
      return updated
    },
    [projectId],
  )

  const deleteProject = useCallback(async () => {
    await projectsApi.remove(projectId)
  }, [projectId])

  const createFeature = useCallback(
    async (input: FeatureInput) => {
      await featuresApi.create(projectId, input)
      await refresh()
    },
    [projectId, refresh],
  )

  const updateFeature = useCallback(
    async (id: number, input: Partial<FeatureInput>) => {
      await featuresApi.update(id, input)
      await refresh()
    },
    [refresh],
  )

  const updateFeatureStatus = useCallback(
    async (id: number, status: ItemStatus) => {
      if (!detail) return
      const previous = detail
      setDetail({
        ...detail,
        features: detail.features.map((f) => (f.id === id ? { ...f, status } : f)),
      })
      try {
        await featuresApi.update(id, { status })
      } catch {
        setDetail(previous)
        throw new Error('Could not update feature status.')
      }
    },
    [detail],
  )

  const deleteFeature = useCallback(
    async (id: number) => {
      await featuresApi.remove(id)
      await refresh()
    },
    [refresh],
  )

  const createRelease = useCallback(
    async (input: ReleaseInput) => {
      await releasesApi.create(projectId, input)
      await refresh()
    },
    [projectId, refresh],
  )

  return {
    detail,
    loading,
    error,
    refresh,
    updateProject,
    deleteProject,
    createFeature,
    updateFeature,
    updateFeatureStatus,
    deleteFeature,
    createRelease,
  }
}
