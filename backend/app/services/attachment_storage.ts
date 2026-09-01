import app from '@adonisjs/core/services/app'
import { randomUUID } from 'node:crypto'
import { unlink } from 'node:fs/promises'
import type { MultipartFile } from '@adonisjs/bodyparser'

/**
 * Uploaded files live outside `tmp/` (which is treated as disposable
 * cache) and outside `public/` (which would make them directly fetchable,
 * bypassing the ownership check on the download route).
 */
const uploadsDir = app.makePath('storage', 'uploads')

export function uploadPath(storageKey: string): string {
  return app.makePath('storage', 'uploads', storageKey)
}

/**
 * Moves a validated multipart upload into storage under a random filename
 * (never the client-supplied one, to avoid path traversal / collisions)
 * and returns the key to persist on the Attachment row.
 */
export async function saveUploadedFile(file: MultipartFile): Promise<string> {
  const storageKey = file.extname ? `${randomUUID()}.${file.extname}` : randomUUID()
  await file.move(uploadsDir, { name: storageKey })
  return storageKey
}

export async function deleteStoredFile(storageKey: string): Promise<void> {
  try {
    await unlink(uploadPath(storageKey))
  } catch (error) {
    // Already missing is fine — this is best-effort cleanup, not a
    // source of truth (the DB row is).
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error
  }
}
