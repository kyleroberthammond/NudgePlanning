/**
 * Every resource in this app traces back to a `Project.userId`. These
 * helpers centralize the "does this row belong to the current user" check
 * — each one either resolves the row or throws a 404 (via `firstOrFail`),
 * which is what we want: a project/feature/task that isn't yours should
 * look exactly like one that doesn't exist.
 */
import Project from '#models/project'
import Feature from '#models/feature'
import Task from '#models/task'
import Release from '#models/release'

export async function ownedProject(id: number | string, userId: number) {
  return Project.query().where('id', id).where('userId', userId).firstOrFail()
}

export async function ownedFeature(id: number | string, userId: number) {
  return Feature.query()
    .where('id', id)
    .whereHas('project', (query) => query.where('userId', userId))
    .firstOrFail()
}

export async function ownedTask(id: number | string, userId: number) {
  return Task.query()
    .where('id', id)
    .whereHas('feature', (query) =>
      query.whereHas('project', (projectQuery) => projectQuery.where('userId', userId))
    )
    .firstOrFail()
}

export async function ownedRelease(id: number | string, userId: number) {
  return Release.query()
    .where('id', id)
    .whereHas('project', (query) => query.where('userId', userId))
    .firstOrFail()
}

/**
 * Confirms a `releaseId` a feature/task is being assigned to both exists
 * and belongs to the same project — otherwise you could assign a feature
 * to a release from a different project (or one you don't own).
 */
export async function assertReleaseInProject(
  releaseId: number,
  projectId: number,
  userId: number
): Promise<void> {
  await Release.query()
    .where('id', releaseId)
    .where('projectId', projectId)
    .whereHas('project', (query) => query.where('userId', userId))
    .firstOrFail()
}

export type ParentType = 'feature' | 'task'

/**
 * Resolves the owned feature or task named by nested route params
 * (`:featureId` or `:taskId`), for the comment/attachment routes that hang
 * off either. Exactly one of the two params is present for any given route.
 */
export async function resolveParent(
  params: Record<string, string | undefined>,
  userId: number
): Promise<{ type: ParentType; id: number }> {
  if (params.featureId) {
    const feature = await ownedFeature(params.featureId, userId)
    return { type: 'feature', id: feature.id }
  }

  if (params.taskId) {
    const task = await ownedTask(params.taskId, userId)
    return { type: 'task', id: task.id }
  }

  throw new Error('resolveParent() called on a route with neither :featureId nor :taskId')
}
