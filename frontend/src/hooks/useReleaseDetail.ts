import { useCallback, useEffect, useState } from 'react'
import { releasesApi } from '../lib/releases'
import { featuresApi } from '../lib/features'
import { tasksApi } from '../lib/tasks'
import { projectsApi } from '../lib/projects'
import type { ReleaseDetail, ReleaseInput } from '../types'

export function useReleaseDetail(releaseId: number) {
  const [detail, setDetail] = useState<ReleaseDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      setDetail(await releasesApi.get(releaseId))
    } catch {
      setError('Could not load this release.')
    } finally {
      setLoading(false)
    }
  }, [releaseId])

  useEffect(() => {
    void refresh()
  }, [refresh])

  const updateRelease = useCallback(
    async (input: Partial<ReleaseInput>) => {
      const updated = await releasesApi.update(releaseId, input)
      setDetail((current) => (current ? { ...current, release: updated } : current))
      return updated
    },
    [releaseId],
  )

  const assignFeature = useCallback(
    async (featureId: number) => {
      await featuresApi.update(featureId, { releaseId })
      await refresh()
    },
    [releaseId, refresh],
  )

  const unassignFeature = useCallback(
    async (featureId: number) => {
      await featuresApi.update(featureId, { releaseId: null })
      await refresh()
    },
    [refresh],
  )

  const assignTask = useCallback(
    async (taskId: number) => {
      await tasksApi.update(taskId, { releaseId })
      await refresh()
    },
    [releaseId, refresh],
  )

  const unassignTask = useCallback(
    async (taskId: number) => {
      await tasksApi.update(taskId, { releaseId: null })
      await refresh()
    },
    [refresh],
  )

  /** All of the release's project features/tasks, for the "add items" picker. */
  const loadCandidates = useCallback(async () => {
    if (!detail) return { features: [], tasks: [] }
    const project = await projectsApi.get(detail.release.projectId)
    return { features: project.features, tasks: project.tasks }
  }, [detail])

  return {
    detail,
    loading,
    error,
    refresh,
    updateRelease,
    assignFeature,
    unassignFeature,
    assignTask,
    unassignTask,
    loadCandidates,
  }
}
