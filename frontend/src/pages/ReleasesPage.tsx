import { useEffect, useState } from 'react'
import type { MouseEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useReleases } from '../hooks/useReleases'
import { Breadcrumbs } from '../components/shared/Breadcrumbs'
import { ReleaseStatusBadge } from '../components/shared/StatusBadge'
import { ReleaseFormModal } from '../components/releases/ReleaseFormModal'
import { formatDate } from '../lib/format'
import { projectsApi } from '../lib/projects'
import type { Release } from '../types'

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false
  return target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)
}

export function ReleasesPage() {
  const { projectId } = useParams()
  const id = Number(projectId)
  const navigate = useNavigate()
  const { releases, loading, error, createRelease, updateRelease, deleteRelease } = useReleases(id)

  const [modalOpen, setModalOpen] = useState(false)
  const [editingRelease, setEditingRelease] = useState<Release | null>(null)
  const [projectName, setProjectName] = useState<string | null>(null)

  useEffect(() => {
    projectsApi
      .get(id)
      .then((detail) => setProjectName(detail.project.name))
      .catch(() => setProjectName(null))
  }, [id])

  function openCreateModal() {
    setEditingRelease(null)
    setModalOpen(true)
  }

  function openEditModal(release: Release, event: MouseEvent) {
    event.stopPropagation()
    setEditingRelease(release)
    setModalOpen(true)
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (modalOpen) return
      if (event.key.toLowerCase() !== 'c') return
      if (event.metaKey || event.ctrlKey || event.altKey) return
      if (isTypingTarget(event.target)) return
      event.preventDefault()
      openCreateModal()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [modalOpen])

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: 'Projects', to: '/projects' },
          { label: projectName ?? 'Project', to: `/projects/${id}` },
          { label: 'Releases' },
        ]}
      />

      <div className="page-header">
        <div>
          <h1>Releases</h1>
          <p className="subtitle">Group features and tasks into shippable releases.</p>
        </div>
        <div className="page-header-actions">
          <Link className="secondary-link" to={`/projects/${id}`}>
            ← Back to project
          </Link>
          <button className="primary" type="button" onClick={openCreateModal}>
            New release
            <kbd>C</kbd>
          </button>
        </div>
      </div>

      {error && <div className="form-error">{error}</div>}

      {!loading && releases.length === 0 && !error && (
        <div className="empty-state">
          <p>No releases yet.</p>
          <button className="primary" type="button" onClick={openCreateModal}>
            Create your first release
          </button>
        </div>
      )}

      {releases.length > 0 && (
        <div className="release-grid">
          {releases.map((release) => (
            <div
              key={release.id}
              className="release-card"
              role="button"
              tabIndex={0}
              onClick={() => navigate(`/releases/${release.id}`)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  navigate(`/releases/${release.id}`)
                }
              }}
            >
              <div className="release-card-top">
                <h3>{release.name}</h3>
                <button
                  type="button"
                  className="icon-button"
                  aria-label={`Edit ${release.name}`}
                  onClick={(event) => openEditModal(release, event)}
                >
                  ✎
                </button>
              </div>
              <ReleaseStatusBadge status={release.status} />
              <p className="release-card-date">Target: {formatDate(release.targetDate)}</p>
              <p className="release-card-counts">
                {release.featuresCount ?? 0} feature{release.featuresCount === 1 ? '' : 's'} ·{' '}
                {release.tasksCount ?? 0} task{release.tasksCount === 1 ? '' : 's'}
              </p>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <ReleaseFormModal
          release={editingRelease}
          onClose={() => setModalOpen(false)}
          onSubmit={async (input) => {
            if (editingRelease) {
              await updateRelease(editingRelease.id, input)
            } else {
              await createRelease(input)
            }
          }}
          onDelete={editingRelease ? (rid) => deleteRelease(rid) : undefined}
        />
      )}
    </div>
  )
}
