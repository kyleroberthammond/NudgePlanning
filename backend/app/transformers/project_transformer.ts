import type Project from '#models/project'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class ProjectTransformer extends BaseTransformer<Project> {
  toObject() {
    return {
      ...this.pick(this.resource, ['id', 'name', 'status', 'createdAt', 'updatedAt']),
      // `pick` would hand back the raw Luxon DateTime, which serializes to a
      // full ISO datetime — these two are date-only fields, so format them
      // as plain "YYYY-MM-DD" strings instead.
      startDate: this.resource.startDate ? this.resource.startDate.toISODate() : null,
      dueDate: this.resource.dueDate ? this.resource.dueDate.toISODate() : null,
    }
  }
}
