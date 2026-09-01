import type Comment from '#models/comment'
import { BaseTransformer } from '@adonisjs/core/transformers'

/**
 * Callers must preload `user` before transforming — the author block below
 * assumes it's there rather than guarding, since every controller path
 * that returns comments preloads it up front.
 */
export default class CommentTransformer extends BaseTransformer<Comment> {
  toObject() {
    return {
      ...this.pick(this.resource, [
        'id',
        'body',
        'commentableType',
        'commentableId',
        'createdAt',
        'updatedAt',
      ]),
      author: {
        id: this.resource.user.id,
        fullName: this.resource.user.fullName,
        initials: this.resource.user.initials,
      },
    }
  }
}
