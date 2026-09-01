import { TaskSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Feature from '#models/feature'
import Release from '#models/release'
import type { ItemStatus } from '#constants/status'

export default class Task extends TaskSchema {
  declare status: ItemStatus

  @belongsTo(() => Feature)
  declare feature: BelongsTo<typeof Feature>

  @belongsTo(() => Release)
  declare release: BelongsTo<typeof Release>
}
