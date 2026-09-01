import { AttachmentSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from '#models/user'

export type AttachableType = 'feature' | 'task'

export default class Attachment extends AttachmentSchema {
  declare attachableType: AttachableType

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
