import { CommentSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from '#models/user'

export type CommentableType = 'feature' | 'task'

export default class Comment extends CommentSchema {
  declare commentableType: CommentableType

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
