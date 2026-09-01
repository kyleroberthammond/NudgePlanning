import { useEffect, useState } from 'react'
import type { Feature, Task } from '../../types'

interface AssignItemsModalProps {
  releaseId: number
  candidates: { features: Feature[]; tasks: Task[] } | null
  loading: boolean
  onClose: () => void
  onAssignFeature: (id: number) => Promise<void>
  onAssignTask: (id: number) => Promise<void>
}

export function AssignItemsModal({
  releaseId,
  candidates,
  loading,
  onClose,
  onAssignFeature,
  onAssignTask,
}: AssignItemsModalProps) {
  const [pendingId, setPendingId] = useState<string | null>(null)

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const otherFeatures = candidates?.features.filter((f) => f.releaseId !== releaseId) ?? []
  const otherTasks = candidates?.tasks.filter((t) => t.releaseId !== releaseId) ?? []

  async function assignFeature(feature: Feature) {
    setPendingId(`feature-${feature.id}`)
    try {
      await onAssignFeature(feature.id)
    } finally {
      setPendingId(null)
    }
  }

  async function assignTask(task: Task) {
    setPendingId(`task-${task.id}`)
    try {
      await onAssignTask(task.id)
    } finally {
      setPendingId(null)
    }
  }

  return (
    <div className="modal-overlay" onMouseDown={onClose}>
      <div className="modal-card" onMouseDown={(e) => e.stopPropagation()}>
        <h2>Add to release</h2>

        {loading && <p className="panel-empty">Loading…</p>}

        {!loading && otherFeatures.length === 0 && otherTasks.length === 0 && (
          <p className="panel-empty">Everything in this project is already in this release.</p>
        )}

        {!loading && otherFeatures.length > 0 && (
          <div className="picker-section">
            <h4>Features</h4>
            <ul className="picker-list">
              {otherFeatures.map((feature) => (
                <li key={feature.id}>
                  <span>{feature.name}</span>
                  {feature.releaseId && <span className="picker-tag">in another release</span>}
                  <button
                    type="button"
                    className="secondary"
                    disabled={pendingId === `feature-${feature.id}`}
                    onClick={() => void assignFeature(feature)}
                  >
                    {pendingId === `feature-${feature.id}` ? 'Adding…' : 'Add'}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {!loading && otherTasks.length > 0 && (
          <div className="picker-section">
            <h4>Tasks</h4>
            <ul className="picker-list">
              {otherTasks.map((task) => (
                <li key={task.id}>
                  <span>{task.name}</span>
                  {task.releaseId && <span className="picker-tag">in another release</span>}
                  <button
                    type="button"
                    className="secondary"
                    disabled={pendingId === `task-${task.id}`}
                    onClick={() => void assignTask(task)}
                  >
                    {pendingId === `task-${task.id}` ? 'Adding…' : 'Add'}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="modal-actions">
          <div className="modal-actions-right">
            <button type="button" className="secondary" onClick={onClose}>
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
