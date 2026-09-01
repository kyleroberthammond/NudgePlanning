import Project from '#models/project'
import { createProjectValidator, updateProjectValidator } from '#validators/project'
import type { HttpContext } from '@adonisjs/core/http'
import ProjectTransformer from '#transformers/project_transformer'

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

  async update({ auth, params, request, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const payload = await request.validateUsing(updateProjectValidator)

    const project = await Project.query()
      .where('id', params.id)
      .where('userId', user.id)
      .firstOrFail()

    project.merge(payload)
    await project.save()

    return serialize(ProjectTransformer.transform(project))
  }

  async destroy({ auth, params, response }: HttpContext) {
    const user = auth.getUserOrFail()

    const project = await Project.query()
      .where('id', params.id)
      .where('userId', user.id)
      .firstOrFail()

    await project.delete()

    return response.noContent()
  }
}
