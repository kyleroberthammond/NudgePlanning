import { ProjectSchema } from '#database/schema'
import { belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import Feature from '#models/feature'
import Release from '#models/release'
import type { ItemStatus } from '#constants/status'

export default class Project extends ProjectSchema {
  declare status: ItemStatus

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @hasMany(() => Feature)
  declare features: HasMany<typeof Feature>

  @hasMany(() => Release)
  declare releases: HasMany<typeof Release>
}
