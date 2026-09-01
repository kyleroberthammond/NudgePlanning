import { useCallback, useEffect, useState } from 'react'
import { releasesApi } from '../lib/releases'
import type { Release, ReleaseInput } from '../types'

export function useReleases(projectId: number) {
  const [releases, setReleases] = useState<Release[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      setReleases(await releasesApi.list(projectId))
    } catch {
      setError('Could not load releases. Try refreshing.')
    } finally {
      setLoading(false)
    }
  }, [projectId])

  useEffect(() => {
    void refresh()
  }, [refresh])

  const createRelease = useCallback(
    async (input: ReleaseInput) => {
      const created = await releasesApi.create(projectId, input)
      setReleases((current) => [created, ...current])
      return created
    },
    [projectId],
  )

  const updateRelease = useCallback(async (id: number, input: Partial<ReleaseInput>) => {
    const updated = await releasesApi.update(id, input)
    setReleases((current) => current.map((release) => (release.id === id ? updated : release)))
    return updated
  }, [])

  const deleteRelease = useCallback(async (id: number) => {
    await releasesApi.remove(id)
    setReleases((current) => current.filter((release) => release.id !== id))
  }, [])

  return { releases, loading, error, refresh, createRelease, updateRelease, deleteRelease }
}
