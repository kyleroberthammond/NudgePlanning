import type Release from '#models/release'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class ReleaseTransformer extends BaseTransformer<Release> {
  toObject() {
    return {
      ...this.pick(this.resource, ['id', 'name', 'status', 'projectId', 'createdAt', 'updatedAt']),
      targetDate: this.resource.targetDate ? this.resource.targetDate.toISODate() : null,
      featuresCount: this.resource.$preloaded.features ? this.resource.features.length : undefined,
      tasksCount: this.resource.$preloaded.tasks ? this.resource.tasks.length : undefined,
    }
  }
}
