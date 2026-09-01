import { ReleaseSchema } from '#database/schema'
import { belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Project from '#models/project'
import Feature from '#models/feature'
import Task from '#models/task'

export const RELEASE_STATUSES = ['planned', 'in_progress', 'released'] as const
export type ReleaseStatus = (typeof RELEASE_STATUSES)[number]

export default class Release extends ReleaseSchema {
  declare status: ReleaseStatus

  @belongsTo(() => Project)
  declare project: BelongsTo<typeof Project>

  @hasMany(() => Feature)
  declare features: HasMany<typeof Feature>

  @hasMany(() => Task)
  declare tasks: HasMany<typeof Task>
}
