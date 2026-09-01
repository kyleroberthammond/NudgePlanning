import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTaskDetail } from '../hooks/useTaskDetail'
import { useAuth } from '../context/AuthContext'
import { Breadcrumbs } from '../components/shared/Breadcrumbs'
import { ItemFormModal } from '../components/shared/ItemFormModal'
import { StatusBadge } from '../components/shared/StatusBadge'
import { CommentsPanel } from '../components/detail/CommentsPanel'
import { AttachmentsPanel } from '../components/detail/AttachmentsPanel'
import { attachmentsApi } from '../lib/attachments'
import { tasksApi } from '../lib/tasks'
import { formatDate } from '../lib/format'

export function TaskDetailPage() {
  const { taskId } = useParams()
  const id = Number(taskId)
  const navigate = useNavigate()
  const { user } = useAuth()
  const {
    detail,
    loading,
    error,
    updateTask,
    addComment,
    deleteComment,
    uploadAttachment,
    deleteAttachment,
  } = useTaskDetail(id)

  const [editingTask, setEditingTask] = useState(false)

  if (loading && !detail) return <p className="panel-empty">Loading…</p>
  if (error && !detail) return <div className="form-error">{error}</div>
  if (!detail) return null

  const { task, feature, project, comments, attachments } = detail

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: 'Projects', to: '/projects' },
          { label: project.name, to: `/projects/${project.id}` },
          { label: feature.name, to: `/features/${feature.id}` },
          { label: task.name },
        ]}
      />

      <div className="page-header">
        <div>
          <h1>{task.name}</h1>
          <div className="detail-meta">
            <StatusBadge status={task.status} />
            <span>{formatDate(task.startDate)} → {formatDate(task.dueDate)}</span>
          </div>
        </div>
        <div className="page-header-actions">
          <button className="secondary" type="button" onClick={() => setEditingTask(true)}>
            Edit task
          </button>
        </div>
      </div>

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

      {editingTask && (
        <ItemFormModal
          itemLabel="task"
          item={task}
          onClose={() => setEditingTask(false)}
          onSubmit={async (input) => {
            await updateTask(input)
          }}
          onDelete={async () => {
            await tasksApi.remove(task.id)
            navigate(`/features/${feature.id}`)
          }}
        />
      )}
    </div>
  )
}
