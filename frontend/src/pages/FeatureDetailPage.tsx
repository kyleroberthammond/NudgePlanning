import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useFeatureDetail } from '../hooks/useFeatureDetail'
import { useAuth } from '../context/AuthContext'
import { Breadcrumbs } from '../components/shared/Breadcrumbs'
import { ItemFormModal } from '../components/shared/ItemFormModal'
import { StatusBadge } from '../components/shared/StatusBadge'
import { TrackableKanban } from '../components/shared/TrackableKanban'
import { TrackableList } from '../components/shared/TrackableList'
import { ViewToggle } from '../components/shared/ViewToggle'
import type { ProjectsView } from '../components/shared/ViewToggle'
import { CommentsPanel } from '../components/detail/CommentsPanel'
import { AttachmentsPanel } from '../components/detail/AttachmentsPanel'
import { attachmentsApi } from '../lib/attachments'
import { featuresApi } from '../lib/features'
import { formatDate } from '../lib/format'
import type { Task } from '../types'

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false
  return target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)
}

export function FeatureDetailPage() {
  const { featureId } = useParams()
  const id = Number(featureId)
  const navigate = useNavigate()
  const { user } = useAuth()
  const {
    detail,
    loading,
    error,
    updateFeature,
    createTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
    addComment,
    deleteComment,
    uploadAttachment,
    deleteAttachment,
  } = useFeatureDetail(id)

  const [view, setView] = useState<ProjectsView>('list')
  const [editingFeature, setEditingFeature] = useState(false)
  const [taskModalOpen, setTaskModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  function openCreateTask() {
    setEditingTask(null)
    setTaskModalOpen(true)
  }

  function openEditTask(task: Task) {
    setEditingTask(task)
    setTaskModalOpen(true)
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (taskModalOpen || editingFeature) return
      if (event.key.toLowerCase() !== 'c') return
      if (event.metaKey || event.ctrlKey || event.altKey) return
      if (isTypingTarget(event.target)) return
      event.preventDefault()
      openCreateTask()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [taskModalOpen, editingFeature])

  if (loading && !detail) return <p className="panel-empty">Loading…</p>
  if (error && !detail) return <div className="form-error">{error}</div>
  if (!detail) return null

  const { feature, project, tasks, comments, attachments } = detail

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: 'Projects', to: '/projects' },
          { label: project.name, to: `/projects/${project.id}` },
          { label: feature.name },
        ]}
      />

      <div className="page-header">
        <div>
          <h1>{feature.name}</h1>
          <div className="detail-meta">
            <StatusBadge status={feature.status} />
            <span>{formatDate(feature.startDate)} → {formatDate(feature.dueDate)}</span>
          </div>
        </div>
        <div className="page-header-actions">
          <button className="secondary" type="button" onClick={() => setEditingFeature(true)}>
            Edit feature
          </button>
        </div>
      </div>

      <section className="detail-section">
        <div className="detail-section-header">
          <h2>Tasks</h2>
          <div className="page-header-actions">
            <ViewToggle value={view} onChange={setView} />
            <button className="primary" type="button" onClick={openCreateTask}>
              New task
              <kbd>C</kbd>
            </button>
          </div>
        </div>

        {tasks.length === 0 ? (
          <div className="empty-state">
            <p>No tasks yet.</p>
            <button className="primary" type="button" onClick={openCreateTask}>
              Create your first task
            </button>
          </div>
        ) : view === 'list' ? (
          <TrackableList
            items={tasks}
            onOpen={(task) => navigate(`/tasks/${task.id}`)}
            onEdit={openEditTask}
          />
        ) : (
          <TrackableKanban
            items={tasks}
            emptyLabel="No tasks"
            onOpen={(task) => navigate(`/tasks/${task.id}`)}
            onEdit={openEditTask}
            onStatusChange={(tid, status) => void updateTaskStatus(tid, status)}
          />
        )}
      </section>

      <div className="detail-panels">
        <CommentsPanel
          comments={comments}
          currentUserId={user?.id}
          onAdd={addComment}
          onDelete={deleteComment}
        />
        <AttachmentsPanel
          attachments={attachments}
          onUpload={uploadAttachment}
          onDelete={deleteAttachment}
          onDownload={attachmentsApi.download}
        />
      </div>

      {editingFeature && (
        <ItemFormModal
          itemLabel="feature"
          item={feature}
          onClose={() => setEditingFeature(false)}
          onSubmit={async (input) => {
            await updateFeature(input)
          }}
          onDelete={async () => {
            await featuresApi.remove(feature.id)
            navigate(`/projects/${project.id}`)
          }}
        />
      )}

      {taskModalOpen && (
        <ItemFormModal
          itemLabel="task"
          item={editingTask}
          onClose={() => setTaskModalOpen(false)}
          onSubmit={async (input) => {
            if (editingTask) {
              await updateTask(editingTask.id, input)
            } else {
              await createTask(input)
            }
          }}
          onDelete={editingTask ? (tid) => deleteTask(tid) : undefined}
        />
      )}
    </div>
  )
}
