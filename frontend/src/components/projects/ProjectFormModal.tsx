import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { ApiError } from '../../lib/api'
import { PROJECT_STATUSES, PROJECT_STATUS_LABELS } from '../../types'
import type { Project, ProjectInput, ProjectStatus } from '../../types'

interface ProjectFormModalProps {
  /** Project being edited, or null when creating a new one. */
  project: Project | null
  onClose: () => void
  onSubmit: (input: ProjectInput) => Promise<void>
  onDelete?: (id: number) => Promise<void>
}

const emptyForm: ProjectInput = {
  name: '',
  startDate: null,
  dueDate: null,
  status: 'not_started',
}

export function ProjectFormModal({ project, onClose, onSubmit, onDelete }: ProjectFormModalProps) {
  // The modal is only ever mounted fresh (ProjectsPage renders it
  // conditionally), so the `project` prop at mount time is all we need —
  // no effect required to keep form state in sync with it.
  const [form, setForm] = useState<ProjectInput>(() =>
    project
      ? {
          name: project.name,
          startDate: project.startDate,
          dueDate: project.dueDate,
          status: project.status,
        }
      : emptyForm,
  )
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [deleting, setDeleting] = useState(false)

  // Close on Escape, but not while a field inside the modal wants the key
  // (nothing here does, this is just a safety net).
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
      setError(err instanceof ApiError ? err.message : 'Could not save the project.')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDelete() {
    if (!project || !onDelete) return
    setDeleting(true)
    setError(null)
    try {
      await onDelete(project.id)
      onClose()
    } catch {
      setError('Could not delete the project.')
      setDeleting(false)
    }
  }

  return (
    <div className="modal-overlay" onMouseDown={onClose}>
      <div className="modal-card" onMouseDown={(e) => e.stopPropagation()}>
        <h2>{project ? 'Edit project' : 'New project'}</h2>

        {error && <div className="form-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="projectName">Name</label>
            <input
              id="projectName"
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

          <div className="field">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={form.status}
              onChange={(e) =>
                setForm((f) => ({ ...f, status: e.target.value as ProjectStatus }))
              }
            >
              {PROJECT_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {PROJECT_STATUS_LABELS[status]}
                </option>
              ))}
            </select>
          </div>

          <div className="modal-actions">
            {project && onDelete && (
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
                {submitting ? 'Saving…' : project ? 'Save changes' : 'Create project'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
