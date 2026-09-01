import Comment from '#models/comment'
import { createCommentValidator } from '#validators/comment'
import type { HttpContext } from '@adonisjs/core/http'
import CommentTransformer from '#transformers/comment_transformer'
import { resolveParent } from '#services/ownership'

export default class CommentsController {
  async index({ auth, params, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const parent = await resolveParent(params, user.id)

    const comments = await Comment.query()
      .where('commentableType', parent.type)
      .where('commentableId', parent.id)
      .preload('user')
      .orderBy('createdAt', 'asc')

    return serialize(CommentTransformer.transform(comments))
  }

  async store({ auth, params, request, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const parent = await resolveParent(params, user.id)
    const { body } = await request.validateUsing(createCommentValidator)

    const comment = await Comment.create({
      body,
      userId: user.id,
      commentableType: parent.type,
      commentableId: parent.id,
    })
    await comment.load('user')

    return serialize(CommentTransformer.transform(comment))
  }

  async destroy({ auth, params, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const comment = await Comment.query()
      .where('id', params.id)
      .where('userId', user.id)
      .firstOrFail()

    await comment.delete()

    return response.noContent()
  }
}
