import type Feature from '#models/feature'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class FeatureTransformer extends BaseTransformer<Feature> {
  toObject() {
    return {
      ...this.pick(this.resource, [
        'id',
        'name',
        'status',
        'projectId',
        'releaseId',
        'createdAt',
        'updatedAt',
      ]),
      startDate: this.resource.startDate ? this.resource.startDate.toISODate() : null,
      dueDate: this.resource.dueDate ? this.resource.dueDate.toISODate() : null,
      // Present only when `.tasks` was preloaded (list views preload it to
      // show a count without shipping every task's full payload).
      tasksCount: this.resource.$preloaded.tasks ? this.resource.tasks.length : undefined,
    }
  }
}
