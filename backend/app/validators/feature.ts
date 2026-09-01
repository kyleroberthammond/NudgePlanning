import vine from '@vinejs/vine'
import { ITEM_STATUSES } from '#constants/status'
import { isoDate } from '#validators/shared'

export const createFeatureValidator = vine.create({
  name: vine.string().trim().minLength(1).maxLength(255),
  startDate: isoDate(),
  dueDate: isoDate(),
  status: vine.enum(ITEM_STATUSES).optional(),
  releaseId: vine.number().positive().nullable().optional(),
})

export const updateFeatureValidator = vine.create({
  name: vine.string().trim().minLength(1).maxLength(255).optional(),
  startDate: isoDate(),
  dueDate: isoDate(),
  status: vine.enum(ITEM_STATUSES).optional(),
  releaseId: vine.number().positive().nullable().optional(),
})
