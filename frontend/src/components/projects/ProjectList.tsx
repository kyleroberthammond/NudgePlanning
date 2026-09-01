import { formatDate } from '../../lib/format'
import type { Project } from '../../types'
import { StatusBadge } from './StatusBadge'

interface ProjectListProps {
  projects: Project[]
  onSelect: (project: Project) => void
}

export function ProjectList({ projects, onSelect }: ProjectListProps) {
  return (
    <div className="project-list">
      <div className="project-list-header">
        <span>Name</span>
        <span>Start date</span>
        <span>Due date</span>
        <span>Status</span>
      </div>
      {projects.map((project) => (
        <button
          key={project.id}
          type="button"
          className="project-list-row"
          onClick={() => onSelect(project)}
        >
          <span className="project-name">{project.name}</span>
          <span>{formatDate(project.startDate)}</span>
          <span>{formatDate(project.dueDate)}</span>
          <span>
            <StatusBadge status={project.status} />
          </span>
        </button>
      ))}
    </div>
  )
}
