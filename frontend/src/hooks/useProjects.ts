import { useCallback, useEffect, useState } from 'react'
import { projectsApi } from '../lib/projects'
import type { ItemStatus, Project, ProjectInput } from '../types'

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      setProjects(await projectsApi.list())
    } catch {
      setError('Could not load projects. Try refreshing.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  const createProject = useCallback(async (input: ProjectInput) => {
    const created = await projectsApi.create(input)
    setProjects((current) => [created, ...current])
    return created
  }, [])

  const updateProject = useCallback(async (id: number, input: Partial<ProjectInput>) => {
    const updated = await projectsApi.update(id, input)
    setProjects((current) => current.map((project) => (project.id === id ? updated : project)))
    return updated
  }, [])

  /** Optimistically moves a card to a new column, rolling back on failure. */
  const updateStatus = useCallback(
    async (id: number, status: ItemStatus) => {
      const previous = projects
      setProjects((current) => current.map((p) => (p.id === id ? { ...p, status } : p)))
      try {
        await projectsApi.update(id, { status })
      } catch {
        setProjects(previous)
        throw new Error('Could not update project status.')
      }
    },
    [projects],
  )

  const deleteProject = useCallback(async (id: number) => {
    await projectsApi.remove(id)
    setProjects((current) => current.filter((project) => project.id !== id))
  }, [])

  return { projects, loading, error, refresh, createProject, updateProject, updateStatus, deleteProject }
}
