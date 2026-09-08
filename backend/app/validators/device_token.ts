import vine from '@vinejs/vine'
import { DEVICE_PLATFORMS } from '#models/device_token'

export const registerDeviceTokenValidator = vine.create({
  token: vine.string().trim().minLength(10),
  platform: vine.enum(DEVICE_PLATFORMS).optional(),
})
