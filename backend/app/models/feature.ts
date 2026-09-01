import { FeatureSchema } from '#database/schema'
import { belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Project from '#models/project'
import Release from '#models/release'
import Task from '#models/task'
import type { ItemStatus } from '#constants/status'

export default class Feature extends FeatureSchema {
  declare status: ItemStatus

  @belongsTo(() => Project)
  declare project: BelongsTo<typeof Project>

  @belongsTo(() => Release)
  declare release: BelongsTo<typeof Release>

  @hasMany(() => Task)
  declare tasks: HasMany<typeof Task>
}
