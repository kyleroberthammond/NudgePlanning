import Attachment from '#models/attachment'
import type { HttpContext } from '@adonisjs/core/http'
import AttachmentTransformer from '#transformers/attachment_transformer'
import { resolveParent } from '#services/ownership'
import { saveUploadedFile, deleteStoredFile, uploadPath } from '#services/attachment_storage'

const MAX_ATTACHMENT_SIZE = '15mb'

export default class AttachmentsController {
  async index({ auth, params, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const parent = await resolveParent(params, user.id)

    const attachments = await Attachment.query()
      .where('attachableType', parent.type)
      .where('attachableId', parent.id)
      .orderBy('createdAt', 'desc')

    return serialize(AttachmentTransformer.transform(attachments))
  }

  async store({ auth, params, request, response, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const parent = await resolveParent(params, user.id)

    const file = request.file('file', { size: MAX_ATTACHMENT_SIZE })
    if (!file) {
      return response.badRequest({ errors: [{ message: 'No file was uploaded.' }] })
    }
    if (!file.isValid) {
      return response.unprocessableEntity({
        errors: file.errors.map((error) => ({ message: error.message })),
      })
    }

    const storageKey = await saveUploadedFile(file)

    const attachment = await Attachment.create({
      userId: user.id,
      attachableType: parent.type,
      attachableId: parent.id,
      filename: file.clientName,
      mimeType:
        file.type && file.subtype ? `${file.type}/${file.subtype}` : 'application/octet-stream',
      size: file.size,
      storageKey,
    })

    return serialize(AttachmentTransformer.transform(attachment))
  }

  async download({ auth, params, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const attachment = await Attachment.query()
      .where('id', params.id)
      .where('userId', user.id)
      .firstOrFail()

    response.attachment(uploadPath(attachment.storageKey), attachment.filename)
  }

  async destroy({ auth, params, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const attachment = await Attachment.query()
      .where('id', params.id)
      .where('userId', user.id)
      .firstOrFail()

    await deleteStoredFile(attachment.storageKey)
    await attachment.delete()

    return response.noContent()
  }
}
