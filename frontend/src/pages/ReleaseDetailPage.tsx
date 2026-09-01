import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useReleaseDetail } from '../hooks/useReleaseDetail'
import { Breadcrumbs } from '../components/shared/Breadcrumbs'
import { StatusBadge, ReleaseStatusBadge } from '../components/shared/StatusBadge'
import { ReleaseFormModal } from '../components/releases/ReleaseFormModal'
import { AssignItemsModal } from '../components/releases/AssignItemsModal'
import { formatDate } from '../lib/format'
import { releasesApi } from '../lib/releases'
import type { Feature, Task } from '../types'

export function ReleaseDetailPage() {
  const { releaseId } = useParams()
  const id = Number(releaseId)
  const navigate = useNavigate()
  const {
    detail,
    loading,
    error,
    updateRelease,
    unassignFeature,
    unassignTask,
    assignFeature,
    assignTask,
    loadCandidates,
  } = useReleaseDetail(id)

  const [editing, setEditing] = useState(false)
  const [pickerOpen, setPickerOpen] = useState(false)
  const [candidates, setCandidates] = useState<{ features: Feature[]; tasks: Task[] } | null>(null)
  const [candidatesLoading, setCandidatesLoading] = useState(false)

  async function openPicker() {
    setPickerOpen(true)
    setCandidatesLoading(true)
    try {
      setCandidates(await loadCandidates())
    } finally {
      setCandidatesLoading(false)
    }
  }

  if (loading && !detail) return <p className="panel-empty">Loading…</p>
  if (error && !detail) return <div className="form-error">{error}</div>
  if (!detail) return null

  const { release, project, features, tasks } = detail

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: 'Projects', to: '/projects' },
          { label: project.name, to: `/projects/${project.id}` },
          { label: 'Releases', to: `/projects/${project.id}/releases` },
          { label: release.name },
        ]}
      />

      <div className="page-header">
        <div>
          <h1>{release.name}</h1>
          <div className="detail-meta">
            <ReleaseStatusBadge status={release.status} />
            <span>Target: {formatDate(release.targetDate)}</span>
          </div>
        </div>
        <div className="page-header-actions">
          <button className="secondary" type="button" onClick={() => setEditing(true)}>
            Edit release
          </button>
          <button className="primary" type="button" onClick={() => void openPicker()}>
            Add items
          </button>
        </div>
      </div>

      <section className="detail-section">
        <h2>Features ({features.length})</h2>
        {features.length === 0 ? (
          <p className="panel-empty">No features in this release yet.</p>
        ) : (
          <div className="release-item-list">
            {features.map((feature) => (
              <div key={feature.id} className="release-item">
                <button className="release-item-name" onClick={() => navigate(`/features/${feature.id}`)}>
                  {feature.name}
                </button>
                <StatusBadge status={feature.status} />
                <button
                  type="button"
                  className="icon-button"
                  aria-label={`Remove ${feature.name} from release`}
                  onClick={() => void unassignFeature(feature.id)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="detail-section">
        <h2>Tasks ({tasks.length})</h2>
        {tasks.length === 0 ? (
          <p className="panel-empty">No tasks in this release yet.</p>
        ) : (
          <div className="release-item-list">
            {tasks.map((task) => (
              <div key={task.id} className="release-item">
                <button className="release-item-name" onClick={() => navigate(`/tasks/${task.id}`)}>
                  {task.name}
                </button>
                <StatusBadge status={task.status} />
                <button
                  type="button"
                  className="icon-button"
                  aria-label={`Remove ${task.name} from release`}
                  onClick={() => void unassignTask(task.id)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {editing && (
        <ReleaseFormModal
          release={release}
          onClose={() => setEditing(false)}
          onSubmit={async (input) => {
            await updateRelease(input)
          }}
          onDelete={async () => {
            await releasesApi.remove(release.id)
            navigate(`/projects/${release.projectId}/releases`)
          }}
        />
      )}

      {pickerOpen && (
        <AssignItemsModal
          releaseId={release.id}
          candidates={candidates}
          loading={candidatesLoading}
          onClose={() => setPickerOpen(false)}
          onAssignFeature={async (fid) => {
            await assignFeature(fid)
            setCandidates(await loadCandidates())
          }}
          onAssignTask={async (tid) => {
            await assignTask(tid)
            setCandidates(await loadCandidates())
          }}
        />
      )}
    </div>
  )
}
