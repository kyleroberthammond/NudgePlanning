import Feature from '#models/feature'
import { createFeatureValidator, updateFeatureValidator } from '#validators/feature'
import type { HttpContext } from '@adonisjs/core/http'
import FeatureTransformer from '#transformers/feature_transformer'
import ProjectTransformer from '#transformers/project_transformer'
import TaskTransformer from '#transformers/task_transformer'
import CommentTransformer from '#transformers/comment_transformer'
import AttachmentTransformer from '#transformers/attachment_transformer'
import Comment from '#models/comment'
import Attachment from '#models/attachment'
import { ownedProject, ownedFeature, assertReleaseInProject } from '#services/ownership'
import { deleteCommentsAndAttachmentsFor } from '#services/cleanup'

export default class FeaturesController {
  async index({ auth, params, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const project = await ownedProject(params.projectId, user.id)

    const features = await Feature.query()
      .where('projectId', project.id)
      .preload('tasks')
      .orderBy('createdAt', 'desc')

    return serialize(FeatureTransformer.transform(features))
  }

  async store({ auth, params, request, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const project = await ownedProject(params.projectId, user.id)
    const payload = await request.validateUsing(createFeatureValidator)

    if (payload.releaseId) {
      await assertReleaseInProject(payload.releaseId, project.id, user.id)
    }

    const feature = await Feature.create({ ...payload, projectId: project.id })

    return serialize(FeatureTransformer.transform(feature))
  }

  async show({ auth, params, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const feature = await ownedFeature(params.id, user.id)
    await feature.load('tasks')
    await feature.load('project')

    const [comments, attachments] = await Promise.all([
      Comment.query()
        .where('commentableType', 'feature')
        .where('commentableId', feature.id)
        .preload('user')
        .orderBy('createdAt', 'asc'),
      Attachment.query()
        .where('attachableType', 'feature')
        .where('attachableId', feature.id)
        .orderBy('createdAt', 'desc'),
    ])

    return serialize({
      feature: FeatureTransformer.transform(feature),
      project: ProjectTransformer.transform(feature.project),
      tasks: TaskTransformer.transform(feature.tasks),
      comments: CommentTransformer.transform(comments),
      attachments: AttachmentTransformer.transform(attachments),
    })
  }

  async update({ auth, params, request, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const feature = await ownedFeature(params.id, user.id)
    const payload = await request.validateUsing(updateFeatureValidator)

    if (payload.releaseId) {
      await assertReleaseInProject(payload.releaseId, feature.projectId, user.id)
    }

    feature.merge(payload)
    await feature.save()

    return serialize(FeatureTransformer.transform(feature))
  }

  async destroy({ auth, params, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const feature = await ownedFeature(params.id, user.id)
    await feature.load('tasks')

    // Tasks cascade-delete at the DB level, but their comments/attachments
    // are polymorphic (no real FK) so they need explicit cleanup too.
    for (const task of feature.tasks) {
      await deleteCommentsAndAttachmentsFor('task', task.id)
    }
    await deleteCommentsAndAttachmentsFor('feature', feature.id)
    await feature.delete()

    return response.noContent()
  }
}
