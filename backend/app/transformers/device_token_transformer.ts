import type DeviceToken from '#models/device_token'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class DeviceTokenTransformer extends BaseTransformer<DeviceToken> {
  toObject() {
    return this.pick(this.resource, ['id', 'platform', 'createdAt', 'updatedAt'])
  }
}
