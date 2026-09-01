import { useState } from 'react'
import type { DragEvent } from 'react'
import { formatDate } from '../../lib/format'
import { PROJECT_STATUSES, PROJECT_STATUS_LABELS } from '../../types'
import type { Project, ProjectStatus } from '../../types'

interface ProjectKanbanProps {
  projects: Project[]
  onSelect: (project: Project) => void
  onStatusChange: (id: number, status: ProjectStatus) => void
}

export function ProjectKanban({ projects, onSelect, onStatusChange }: ProjectKanbanProps) {
  const [draggingId, setDraggingId] = useState<number | null>(null)
  const [overColumn, setOverColumn] = useState<ProjectStatus | null>(null)

  function handleDrop(status: ProjectStatus) {
    return (event: DragEvent) => {
      event.preventDefault()
      setOverColumn(null)
      const id = Number(event.dataTransfer.getData('text/plain'))
      const project = projects.find((p) => p.id === id)
      if (project && project.status !== status) {
        onStatusChange(id, status)
      }
      setDraggingId(null)
    }
  }

  return (
    <div className="kanban">
      {PROJECT_STATUSES.map((status) => {
        const columnProjects = projects.filter((project) => project.status === status)
        return (
          <div
            key={status}
            className={`kanban-column ${overColumn === status ? 'drag-over' : ''}`}
            onDragOver={(event) => {
              event.preventDefault()
              setOverColumn(status)
            }}
            onDragLeave={() => setOverColumn((current) => (current === status ? null : current))}
            onDrop={handleDrop(status)}
          >
            <div className="kanban-column-header">
              <span>{PROJECT_STATUS_LABELS[status]}</span>
              <span className="kanban-count">{columnProjects.length}</span>
            </div>

            <div className="kanban-column-body">
              {columnProjects.map((project) => (
                <div
                  key={project.id}
                  className={`kanban-card ${draggingId === project.id ? 'dragging' : ''}`}
                  draggable
                  onDragStart={(event) => {
                    event.dataTransfer.setData('text/plain', String(project.id))
                    event.dataTransfer.effectAllowed = 'move'
                    setDraggingId(project.id)
                  }}
                  onDragEnd={() => setDraggingId(null)}
                  onClick={() => onSelect(project)}
                >
                  <div className="kanban-card-name">{project.name}</div>
                  {(project.startDate || project.dueDate) && (
                    <div className="kanban-card-dates">
                      {formatDate(project.startDate)} → {formatDate(project.dueDate)}
                    </div>
                  )}
                </div>
              ))}
              {columnProjects.length === 0 && <div className="kanban-empty">No projects</div>}
            </div>
          </div>
        )
      })}
    </div>
  )
}
