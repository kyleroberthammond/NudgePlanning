import vine from '@vinejs/vine'
import { RELEASE_STATUSES } from '#models/release'
import { isoDate } from '#validators/shared'

export const createReleaseValidator = vine.create({
  name: vine.string().trim().minLength(1).maxLength(255),
  targetDate: isoDate(),
  status: vine.enum(RELEASE_STATUSES).optional(),
})

export const updateReleaseValidator = vine.create({
  name: vine.string().trim().minLength(1).maxLength(255).optional(),
  targetDate: isoDate(),
  status: vine.enum(RELEASE_STATUSES).optional(),
})
