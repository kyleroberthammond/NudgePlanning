import { ProjectSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from '#models/user'

export const PROJECT_STATUSES = ['not_started', 'in_progress', 'on_hold', 'completed'] as const
export type ProjectStatus = (typeof PROJECT_STATUSES)[number]

export default class Project extends ProjectSchema {
  declare status: ProjectStatus

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
