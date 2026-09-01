import { PROJECT_STATUS_LABELS } from '../../types'
import type { ProjectStatus } from '../../types'

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return <span className={`status-badge status-${status}`}>{PROJECT_STATUS_LABELS[status]}</span>
}
