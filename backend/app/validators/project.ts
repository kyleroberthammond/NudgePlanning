import vine from '@vinejs/vine'
import { ITEM_STATUSES } from '#constants/status'
import { isoDate } from '#validators/shared'

export const createProjectValidator = vine.create({
  name: vine.string().trim().minLength(1).maxLength(255),
  startDate: isoDate(),
  dueDate: isoDate(),
  status: vine.enum(ITEM_STATUSES).optional(),
})

export const updateProjectValidator = vine.create({
  name: vine.string().trim().minLength(1).maxLength(255).optional(),
  startDate: isoDate(),
  dueDate: isoDate(),
  status: vine.enum(ITEM_STATUSES).optional(),
})
