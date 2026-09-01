import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProjects } from '../hooks/useProjects'
import { ItemFormModal } from '../components/shared/ItemFormModal'
import { TrackableKanban } from '../components/shared/TrackableKanban'
import { TrackableList } from '../components/shared/TrackableList'
import { ViewToggle } from '../components/shared/ViewToggle'
import type { ProjectsView } from '../components/shared/ViewToggle'
import type { Project } from '../types'

const VIEW_KEY = 'nudgeplanning.projectsView'

function loadStoredView(): ProjectsView {
  try {
    const stored = localStorage.getItem(VIEW_KEY)
    return stored === 'kanban' ? 'kanban' : 'list'
  } catch {
    return 'list'
  }
}

/** Is the user currently typing somewhere, so single-key shortcuts should be ignored? */
function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false
  return target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)
}

export function ProjectsPage() {
  const { projects, loading, error, createProject, updateProject, updateStatus, deleteProject } =
    useProjects()
  const navigate = useNavigate()
  const [view, setView] = useState<ProjectsView>(loadStoredView)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)

  function changeView(next: ProjectsView) {
    setView(next)
    try {
      localStorage.setItem(VIEW_KEY, next)
    } catch {
      // Best-effort persistence only.
    }
  }

  function openCreateModal() {
    setEditingProject(null)
    setModalOpen(true)
  }

  function openEditModal(project: Project) {
    setEditingProject(project)
    setModalOpen(true)
  }

  // Keyboard shortcut: press "c" anywhere on the page (when not typing, and
  // without modifier keys) to create a new project.
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
      <div className="page-header">
        <div>
          <h1>Projects</h1>
          <p className="subtitle">Everything you're working on.</p>
        </div>
        <div className="page-header-actions">
          <ViewToggle value={view} onChange={changeView} />
          <button className="primary" type="button" onClick={openCreateModal}>
            New project
            <kbd>C</kbd>
          </button>
        </div>
      </div>

      {error && <div className="form-error">{error}</div>}

      {!loading && projects.length === 0 && !error && (
        <div className="empty-state">
          <p>No projects yet.</p>
          <button className="primary" type="button" onClick={openCreateModal}>
            Create your first project
          </button>
        </div>
      )}

      {projects.length > 0 &&
        (view === 'list' ? (
          <TrackableList
            items={projects}
            onOpen={(project) => navigate(`/projects/${project.id}`)}
            onEdit={openEditModal}
          />
        ) : (
          <TrackableKanban
            items={projects}
            emptyLabel="No projects"
            onOpen={(project) => navigate(`/projects/${project.id}`)}
            onEdit={openEditModal}
            onStatusChange={(id, status) => void updateStatus(id, status)}
          />
        ))}

      {modalOpen && (
        <ItemFormModal
          itemLabel="project"
          item={editingProject}
          onClose={() => setModalOpen(false)}
          onSubmit={async (input) => {
            if (editingProject) {
              await updateProject(editingProject.id, input)
            } else {
              await createProject(input)
            }
          }}
          onDelete={editingProject ? (id) => deleteProject(id) : undefined}
        />
      )}
    </div>
  )
}
