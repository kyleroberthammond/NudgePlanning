import Task from '#models/task'
import { createTaskValidator, updateTaskValidator } from '#validators/task'
import type { HttpContext } from '@adonisjs/core/http'
import TaskTransformer from '#transformers/task_transformer'
import FeatureTransformer from '#transformers/feature_transformer'
import ProjectTransformer from '#transformers/project_transformer'
import CommentTransformer from '#transformers/comment_transformer'
import AttachmentTransformer from '#transformers/attachment_transformer'
import Comment from '#models/comment'
import Attachment from '#models/attachment'
import { ownedFeature, ownedTask, assertReleaseInProject } from '#services/ownership'
import { deleteCommentsAndAttachmentsFor } from '#services/cleanup'

export default class TasksController {
  async index({ auth, params, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const feature = await ownedFeature(params.featureId, user.id)

    const tasks = await Task.query().where('featureId', feature.id).orderBy('createdAt', 'desc')

    return serialize(TaskTransformer.transform(tasks))
  }

  async store({ auth, params, request, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const feature = await ownedFeature(params.featureId, user.id)
    const payload = await request.validateUsing(createTaskValidator)

    if (payload.releaseId) {
      await assertReleaseInProject(payload.releaseId, feature.projectId, user.id)
    }

    const task = await Task.create({ ...payload, featureId: feature.id })

    return serialize(TaskTransformer.transform(task))
  }

  async show({ auth, params, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const task = await ownedTask(params.id, user.id)
    await task.load((loader) => loader.load('feature', (query) => query.preload('project')))

    const [comments, attachments] = await Promise.all([
      Comment.query()
        .where('commentableType', 'task')
        .where('commentableId', task.id)
        .preload('user')
        .orderBy('createdAt', 'asc'),
      Attachment.query()
        .where('attachableType', 'task')
        .where('attachableId', task.id)
        .orderBy('createdAt', 'desc'),
    ])

    return serialize({
      task: TaskTransformer.transform(task),
      feature: FeatureTransformer.transform(task.feature),
      project: ProjectTransformer.transform(task.feature.project),
      comments: CommentTransformer.transform(comments),
      attachments: AttachmentTransformer.transform(attachments),
    })
  }

  async update({ auth, params, request, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const task = await ownedTask(params.id, user.id)
    const payload = await request.validateUsing(updateTaskValidator)

    if (payload.releaseId) {
      await task.load('feature')
      await assertReleaseInProject(payload.releaseId, task.feature.projectId, user.id)
    }

    task.merge(payload)
    await task.save()

    return serialize(TaskTransformer.transform(task))
  }

  async destroy({ auth, params, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const task = await ownedTask(params.id, user.id)

    await deleteCommentsAndAttachmentsFor('task', task.id)
    await task.delete()

    return response.noContent()
  }
}
