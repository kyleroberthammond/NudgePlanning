import Release from '#models/release'
import { createReleaseValidator, updateReleaseValidator } from '#validators/release'
import type { HttpContext } from '@adonisjs/core/http'
import ReleaseTransformer from '#transformers/release_transformer'
import FeatureTransformer from '#transformers/feature_transformer'
import TaskTransformer from '#transformers/task_transformer'
import ProjectTransformer from '#transformers/project_transformer'
import { ownedProject, ownedRelease } from '#services/ownership'

export default class ReleasesController {
  async index({ auth, params, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const project = await ownedProject(params.projectId, user.id)

    const releases = await Release.query()
      .where('projectId', project.id)
      .preload('features')
      .preload('tasks')
      .orderBy('createdAt', 'desc')

    return serialize(ReleaseTransformer.transform(releases))
  }

  async store({ auth, params, request, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const project = await ownedProject(params.projectId, user.id)
    const payload = await request.validateUsing(createReleaseValidator)

    const release = await Release.create({ ...payload, projectId: project.id })

    return serialize(ReleaseTransformer.transform(release))
  }

  async show({ auth, params, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const release = await ownedRelease(params.id, user.id)
    await release.load('features')
    await release.load('tasks')
    await release.load('project')

    return serialize({
      release: ReleaseTransformer.transform(release),
      project: ProjectTransformer.transform(release.project),
      features: FeatureTransformer.transform(release.features),
      tasks: TaskTransformer.transform(release.tasks),
    })
  }

  async update({ auth, params, request, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const release = await ownedRelease(params.id, user.id)
    const payload = await request.validateUsing(updateReleaseValidator)

    release.merge(payload)
    await release.save()

    return serialize(ReleaseTransformer.transform(release))
  }

  async destroy({ auth, params, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const release = await ownedRelease(params.id, user.id)

    // Features/tasks in this release aren't deleted — the FK is
    // ON DELETE SET NULL, so they just become unassigned.
    await release.delete()

    return response.noContent()
  }
}
