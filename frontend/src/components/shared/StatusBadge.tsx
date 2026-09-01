import { ITEM_STATUS_LABELS, RELEASE_STATUS_LABELS } from '../../types'
import type { ItemStatus, ReleaseStatus } from '../../types'

export function StatusBadge({ status }: { status: ItemStatus }) {
  return <span className={`status-badge status-${status}`}>{ITEM_STATUS_LABELS[status]}</span>
}

export function ReleaseStatusBadge({ status }: { status: ReleaseStatus }) {
  return (
    <span className={`status-badge release-status-${status}`}>{RELEASE_STATUS_LABELS[status]}</span>
  )
}
