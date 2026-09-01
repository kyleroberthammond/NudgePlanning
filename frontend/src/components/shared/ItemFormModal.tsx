import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { ApiError } from '../../lib/api'
import { ITEM_STATUSES, ITEM_STATUS_LABELS } from '../../types'
import type { ItemStatus, Release, TrackableItem } from '../../types'

export interface ItemFormValues {
  name: string
  startDate: string | null
  dueDate: string | null
  status: ItemStatus
  /** Always set (defaults to null) — Project submissions simply ignore it. */
  releaseId: number | null
}

interface ItemFormModalProps {
  /** Lowercase noun used in headings and messages, e.g. "project", "feature". */
  itemLabel: string
  /** Item being edited, or null when creating a new one. */
  item: (TrackableItem & { releaseId?: number | null }) | null
  /** When given, shows a Release selector (features/tasks only). */
  releases?: Release[]
  onClose: () => void
  onSubmit: (input: ItemFormValues) => Promise<void>
  onDelete?: (id: number) => Promise<void>
}

export function ItemFormModal({
  itemLabel,
  item,
  releases,
  onClose,
  onSubmit,
  onDelete,
}: ItemFormModalProps) {
  const [form, setForm] = useState<ItemFormValues>(() =>
    item
      ? {
          name: item.name,
          startDate: item.startDate,
          dueDate: item.dueDate,
          status: item.status,
          releaseId: item.releaseId ?? null,
        }
      : { name: '', startDate: null, dueDate: null, status: 'not_started', releaseId: null },
  )
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await onSubmit(form)
      onClose()
    } catch (err) {
      setError(err instanceof ApiError ? err.message : `Could not save the ${itemLabel}.`)
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDelete() {
    if (!item || !onDelete) return
    setDeleting(true)
    setError(null)
    try {
      await onDelete(item.id)
      onClose()
    } catch {
      setError(`Could not delete the ${itemLabel}.`)
      setDeleting(false)
    }
  }

  return (
    <div className="modal-overlay" onMouseDown={onClose}>
      <div className="modal-card" onMouseDown={(e) => e.stopPropagation()}>
        <h2>{item ? `Edit ${itemLabel}` : `New ${itemLabel}`}</h2>

        {error && <div className="form-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="itemName">Name</label>
            <input
              id="itemName"
              type="text"
              autoFocus
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="startDate">Start date</label>
              <input
                id="startDate"
                type="date"
                value={form.startDate ?? ''}
                onChange={(e) => setForm((f) => ({ ...f, startDate: e.target.value || null }))}
              />
            </div>
            <div className="field">
              <label htmlFor="dueDate">Due date</label>
              <input
                id="dueDate"
                type="date"
                value={form.dueDate ?? ''}
                onChange={(e) => setForm((f) => ({ ...f, dueDate: e.target.value || null }))}
              />
            </div>
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                value={form.status}
                onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as ItemStatus }))}
              >
                {ITEM_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {ITEM_STATUS_LABELS[status]}
                  </option>
                ))}
              </select>
            </div>

            {releases && (
              <div className="field">
                <label htmlFor="releaseId">Release</label>
                <select
                  id="releaseId"
                  value={form.releaseId ?? ''}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      releaseId: e.target.value ? Number(e.target.value) : null,
                    }))
                  }
                >
                  <option value="">No release</option>
                  {releases.map((release) => (
                    <option key={release.id} value={release.id}>
                      {release.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="modal-actions">
            {item && onDelete && (
              <button
                type="button"
                className="danger"
                onClick={() => void handleDelete()}
                disabled={deleting || submitting}
              >
                {deleting ? 'Deleting…' : 'Delete'}
              </button>
            )}
            <div className="modal-actions-right">
              <button type="button" className="secondary" onClick={onClose}>
                Cancel
              </button>
              <button className="primary" type="submit" disabled={submitting || deleting}>
                {submitting ? 'Saving…' : item ? 'Save changes' : `Create ${itemLabel}`}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
