import Project from '#models/project'
import Feature from '#models/feature'
import { createProjectValidator, updateProjectValidator } from '#validators/project'
import type { HttpContext } from '@adonisjs/core/http'
import ProjectTransformer from '#transformers/project_transformer'
import FeatureTransformer from '#transformers/feature_transformer'
import TaskTransformer from '#transformers/task_transformer'
import ReleaseTransformer from '#transformers/release_transformer'
import { ownedProject } from '#services/ownership'
import { deleteCommentsAndAttachmentsFor } from '#services/cleanup'

export default class ProjectsController {
  async index({ auth, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const projects = await Project.query().where('userId', user.id).orderBy('createdAt', 'desc')

    return serialize(ProjectTransformer.transform(projects))
  }

  async store({ auth, request, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const payload = await request.validateUsing(createProjectValidator)

    const project = await Project.create({ ...payload, userId: user.id })

    return serialize(ProjectTransformer.transform(project))
  }

  async show({ auth, params, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const project = await ownedProject(params.id, user.id)
    await project.load((loader) => loader.load('features', (query) => query.preload('tasks')))
    await project.load('releases')

    // Flattened so the frontend can build a release-assignment picker (and
    // similar cross-feature views) from one request instead of N+1 fetches.
    const tasks = project.features.flatMap((feature) => feature.tasks)

    return serialize({
      project: ProjectTransformer.transform(project),
      features: FeatureTransformer.transform(project.features),
      tasks: TaskTransformer.transform(tasks),
      releases: ReleaseTransformer.transform(project.releases),
    })
  }

  async update({ auth, params, request, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const payload = await request.validateUsing(updateProjectValidator)
    const project = await ownedProject(params.id, user.id)

    project.merge(payload)
    await project.save()

    return serialize(ProjectTransformer.transform(project))
  }

  async destroy({ auth, params, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const project = await ownedProject(params.id, user.id)

    // Features/tasks cascade-delete at the DB level, but their comments and
    // attachments are polymorphic (no real FK), so clean those up first.
    const features = await Feature.query().where('projectId', project.id).preload('tasks')
    for (const feature of features) {
      for (const task of feature.tasks) {
        await deleteCommentsAndAttachmentsFor('task', task.id)
      }
      await deleteCommentsAndAttachmentsFor('feature', feature.id)
    }

    await project.delete()

    return response.noContent()
  }
}
