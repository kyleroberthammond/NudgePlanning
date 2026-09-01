import vine from '@vinejs/vine'
import { DateTime } from 'luxon'
import { PROJECT_STATUSES } from '#models/project'

/**
 * Accepts a plain "YYYY-MM-DD" string and converts it to a Luxon DateTime,
 * matching what Lucid's `@column.date()` columns expect on the model.
 *
 * `nullable().optional()` must come before `transform()` here: the modifier
 * order controls the runtime null/undefined short-circuit too, not just the
 * types — transforming first would hand the transformer a raw `null` (since
 * the frontend always sends `startDate`/`dueDate` explicitly, even when
 * empty) and Luxon would happily "parse" that into an invalid DateTime.
 */
const isoDate = () =>
  vine
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .nullable()
    .optional()
    .transform((value) => (value === null || value === undefined ? value : DateTime.fromISO(value)))

export const createProjectValidator = vine.create({
  name: vine.string().trim().minLength(1).maxLength(255),
  startDate: isoDate(),
  dueDate: isoDate(),
  status: vine.enum(PROJECT_STATUSES).optional(),
})

export const updateProjectValidator = vine.create({
  name: vine.string().trim().minLength(1).maxLength(255).optional(),
  startDate: isoDate(),
  dueDate: isoDate(),
  status: vine.enum(PROJECT_STATUSES).optional(),
})
