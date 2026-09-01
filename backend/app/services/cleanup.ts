import Comment from '#models/comment'
import Attachment from '#models/attachment'
import { deleteStoredFile } from '#services/attachment_storage'
import type { ParentType } from '#services/ownership'

/**
 * Comments and attachments aren't linked with a real DB foreign key (their
 * owner is polymorphic), so deleting a feature/task needs to clean up its
 * comments, attachments, and the attachments' on-disk files explicitly.
 */
export async function deleteCommentsAndAttachmentsFor(type: ParentType, id: number): Promise<void> {
  await Comment.query().where('commentableType', type).where('commentableId', id).delete()

  const attachments = await Attachment.query()
    .where('attachableType', type)
    .where('attachableId', id)

  for (const attachment of attachments) {
    await deleteStoredFile(attachment.storageKey)
  }

  await Attachment.query().where('attachableType', type).where('attachableId', id).delete()
}
