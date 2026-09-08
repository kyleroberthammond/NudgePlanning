import { DeviceTokenSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from '#models/user'

export const DEVICE_PLATFORMS = ['android'] as const
export type DevicePlatform = (typeof DEVICE_PLATFORMS)[number]

export default class DeviceToken extends DeviceTokenSchema {
  declare platform: DevicePlatform

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
