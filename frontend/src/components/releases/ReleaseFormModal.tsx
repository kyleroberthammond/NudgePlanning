import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { ApiError } from '../../lib/api'
import { RELEASE_STATUSES, RELEASE_STATUS_LABELS } from '../../types'
import type { Release, ReleaseInput, ReleaseStatus } from '../../types'

interface ReleaseFormModalProps {
  release: Release | null
  onClose: () => void
  onSubmit: (input: ReleaseInput) => Promise<void>
  onDelete?: (id: number) => Promise<void>
}

export function ReleaseFormModal({ release, onClose, onSubmit, onDelete }: ReleaseFormModalProps) {
  const [form, setForm] = useState<ReleaseInput>(() =>
    release
      ? { name: release.name, targetDate: release.targetDate, status: release.status }
      : { name: '', targetDate: null, status: 'planned' },
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
      setError(err instanceof ApiError ? err.message : 'Could not save the release.')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDelete() {
    if (!release || !onDelete) return
    setDeleting(true)
    setError(null)
    try {
      await onDelete(release.id)
      onClose()
    } catch {
      setError('Could not delete the release.')
      setDeleting(false)
    }
  }

  return (
    <div className="modal-overlay" onMouseDown={onClose}>
      <div className="modal-card" onMouseDown={(e) => e.stopPropagation()}>
        <h2>{release ? 'Edit release' : 'New release'}</h2>

        {error && <div className="form-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="releaseName">Name</label>
            <input
              id="releaseName"
              type="text"
              autoFocus
              required
              placeholder="v1.0"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="targetDate">Target date</label>
              <input
                id="targetDate"
                type="date"
                value={form.targetDate ?? ''}
                onChange={(e) => setForm((f) => ({ ...f, targetDate: e.target.value || null }))}
              />
            </div>
            <div className="field">
              <label htmlFor="releaseStatus">Status</label>
              <select
                id="releaseStatus"
                value={form.status}
                onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as ReleaseStatus }))}
              >
                {RELEASE_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {RELEASE_STATUS_LABELS[status]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="modal-actions">
            {release && onDelete && (
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
                {submitting ? 'Saving…' : release ? 'Save changes' : 'Create release'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
