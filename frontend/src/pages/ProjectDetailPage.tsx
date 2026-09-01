import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useProjectDetail } from '../hooks/useProjectDetail'
import { Breadcrumbs } from '../components/shared/Breadcrumbs'
import { ItemFormModal } from '../components/shared/ItemFormModal'
import { StatusBadge, ReleaseStatusBadge } from '../components/shared/StatusBadge'
import { TrackableKanban } from '../components/shared/TrackableKanban'
import { TrackableList } from '../components/shared/TrackableList'
import { ViewToggle } from '../components/shared/ViewToggle'
import type { ProjectsView } from '../components/shared/ViewToggle'
import { formatDate } from '../lib/format'
import type { Feature } from '../types'

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false
  return target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)
}

export function ProjectDetailPage() {
  const { projectId } = useParams()
  const id = Number(projectId)
  const navigate = useNavigate()
  const {
    detail,
    loading,
    error,
    updateProject,
    deleteProject,
    createFeature,
    updateFeature,
    updateFeatureStatus,
    deleteFeature,
  } = useProjectDetail(id)

  const [view, setView] = useState<ProjectsView>('list')
  const [editingProject, setEditingProject] = useState(false)
  const [featureModalOpen, setFeatureModalOpen] = useState(false)
  const [editingFeature, setEditingFeature] = useState<Feature | null>(null)

  function openCreateFeature() {
    setEditingFeature(null)
    setFeatureModalOpen(true)
  }

  function openEditFeature(feature: Feature) {
    setEditingFeature(feature)
    setFeatureModalOpen(true)
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (featureModalOpen || editingProject) return
      if (event.key.toLowerCase() !== 'c') return
      if (event.metaKey || event.ctrlKey || event.altKey) return
      if (isTypingTarget(event.target)) return
      event.preventDefault()
      openCreateFeature()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [featureModalOpen, editingProject])

  if (loading && !detail) return <p className="panel-empty">Loading…</p>
  if (error && !detail) return <div className="form-error">{error}</div>
  if (!detail) return null

  const { project, features, releases } = detail

  return (
    <div>
      <Breadcrumbs items={[{ label: 'Projects', to: '/projects' }, { label: project.name }]} />

      <div className="page-header">
        <div>
          <h1>{project.name}</h1>
          <div className="detail-meta">
            <StatusBadge status={project.status} />
            <span>{formatDate(project.startDate)} → {formatDate(project.dueDate)}</span>
          </div>
        </div>
        <div className="page-header-actions">
          <button className="secondary" type="button" onClick={() => setEditingProject(true)}>
            Edit project
          </button>
        </div>
      </div>

      <section className="detail-section">
        <div className="detail-section-header">
          <h2>Features</h2>
          <div className="page-header-actions">
            <ViewToggle value={view} onChange={setView} />
            <button className="primary" type="button" onClick={openCreateFeature}>
              New feature
              <kbd>C</kbd>
            </button>
          </div>
        </div>

        {features.length === 0 ? (
          <div className="empty-state">
            <p>No features yet.</p>
            <button className="primary" type="button" onClick={openCreateFeature}>
              Create your first feature
            </button>
          </div>
        ) : view === 'list' ? (
          <TrackableList
            items={features}
            onOpen={(feature) => navigate(`/features/${feature.id}`)}
            onEdit={openEditFeature}
            renderMeta={(feature) =>
              feature.tasksCount ? ` · ${feature.tasksCount} task${feature.tasksCount === 1 ? '' : 's'}` : ''
            }
          />
        ) : (
          <TrackableKanban
            items={features}
            emptyLabel="No features"
            onOpen={(feature) => navigate(`/features/${feature.id}`)}
            onEdit={openEditFeature}
            onStatusChange={(fid, status) => void updateFeatureStatus(fid, status)}
            renderMeta={(feature) =>
              feature.tasksCount ? `${feature.tasksCount} task${feature.tasksCount === 1 ? '' : 's'}` : null
            }
          />
        )}
      </section>

      <section className="detail-section">
        <div className="detail-section-header">
          <h2>Releases</h2>
          <Link className="secondary-link" to={`/projects/${project.id}/releases`}>
            Manage releases →
          </Link>
        </div>

        {releases.length === 0 ? (
          <p className="panel-empty">No releases yet.</p>
        ) : (
          <div className="release-chip-row">
            {releases.map((release) => (
              <Link key={release.id} to={`/releases/${release.id}`} className="release-chip">
                <span>{release.name}</span>
                <ReleaseStatusBadge status={release.status} />
              </Link>
            ))}
          </div>
        )}
      </section>

      {editingProject && (
        <ItemFormModal
          itemLabel="project"
          item={project}
          onClose={() => setEditingProject(false)}
          onSubmit={async (input) => {
            await updateProject(input)
          }}
          onDelete={async () => {
            await deleteProject()
            navigate('/projects')
          }}
        />
      )}

      {featureModalOpen && (
        <ItemFormModal
          itemLabel="feature"
          item={editingFeature}
          releases={releases}
          onClose={() => setFeatureModalOpen(false)}
          onSubmit={async (input) => {
            if (editingFeature) {
              await updateFeature(editingFeature.id, input)
            } else {
              await createFeature(input)
            }
          }}
          onDelete={editingFeature ? (fid) => deleteFeature(fid) : undefined}
        />
      )}
    </div>
  )
}
