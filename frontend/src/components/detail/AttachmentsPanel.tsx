import { useRef, useState } from 'react'
import type { DragEvent } from 'react'
import { ApiError } from '../../lib/api'
import { formatFileSize } from '../../lib/format'
import type { Attachment } from '../../types'

interface AttachmentsPanelProps {
  attachments: Attachment[]
  onUpload: (file: File) => Promise<void>
  onDelete: (id: number) => Promise<void>
  onDownload: (attachment: Attachment) => Promise<void>
}

const FILE_ICONS: Record<string, string> = {
  image: '🖼️',
  video: '🎞️',
  audio: '🎵',
  application: '📄',
  text: '📄',
}

function iconFor(mimeType: string): string {
  return FILE_ICONS[mimeType.split('/')[0]] ?? '📎'
}

export function AttachmentsPanel({ attachments, onUpload, onDelete, onDownload }: AttachmentsPanelProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFile(file: File | undefined) {
    if (!file) return
    setUploading(true)
    setError(null)
    try {
      await onUpload(file)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not upload the file.')
    } finally {
      setUploading(false)
    }
  }

  function handleDrop(event: DragEvent) {
    event.preventDefault()
    setDragOver(false)
    void handleFile(event.dataTransfer.files[0])
  }

  return (
    <div className="panel">
      <h3>
        Attachments {attachments.length > 0 && <span className="panel-count">{attachments.length}</span>}
      </h3>

      {error && <div className="form-error">{error}</div>}

      {attachments.length > 0 && (
        <ul className="attachment-list">
          {attachments.map((attachment) => (
            <li key={attachment.id} className="attachment">
              <span className="attachment-icon">{iconFor(attachment.mimeType)}</span>
              <button
                type="button"
                className="attachment-name"
                onClick={() => void onDownload(attachment)}
                title={`Download ${attachment.filename}`}
              >
                {attachment.filename}
              </button>
              <span className="attachment-size">{formatFileSize(attachment.size)}</span>
              <button
                type="button"
                className="icon-button"
                aria-label={`Delete ${attachment.filename}`}
                onClick={() => void onDelete(attachment.id)}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}

      <div
        className={`dropzone ${dragOver ? 'drag-over' : ''}`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        role="button"
        tabIndex={0}
      >
        <input
          ref={inputRef}
          type="file"
          hidden
          onChange={(e) => void handleFile(e.target.files?.[0])}
        />
        {uploading ? 'Uploading…' : 'Drop a file here, or click to browse'}
      </div>
    </div>
  )
}
