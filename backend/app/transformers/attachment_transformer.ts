import type Attachment from '#models/attachment'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class AttachmentTransformer extends BaseTransformer<Attachment> {
  toObject() {
    return {
      ...this.pick(this.resource, [
        'id',
        'filename',
        'mimeType',
        'size',
        'attachableType',
        'attachableId',
        'createdAt',
      ]),
      downloadUrl: `/api/v1/attachments/${this.resource.id}/download`,
    }
  }
}
