import type { ReactNode } from 'react'
import { formatDate } from '../../lib/format'
import type { TrackableItem } from '../../types'
import { StatusBadge } from './StatusBadge'

interface TrackableListProps<T extends TrackableItem> {
  items: T[]
  onOpen: (item: T) => void
  onEdit: (item: T) => void
  /** Optional extra column content, e.g. a task count on a feature row. */
  renderMeta?: (item: T) => ReactNode
}

export function TrackableList<T extends TrackableItem>({
  items,
  onOpen,
  onEdit,
  renderMeta,
}: TrackableListProps<T>) {
  return (
    <div className="trackable-list">
      <div className="trackable-list-header">
        <span>Name</span>
        <span>Start date</span>
        <span>Due date</span>
        <span>Status</span>
        <span />
      </div>
      {items.map((item) => (
        <div
          key={item.id}
          className="trackable-list-row"
          role="button"
          tabIndex={0}
          onClick={() => onOpen(item)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              onOpen(item)
            }
          }}
        >
          <span className="trackable-name">
            {item.name}
            {renderMeta && <span className="trackable-meta">{renderMeta(item)}</span>}
          </span>
          <span>{formatDate(item.startDate)}</span>
          <span>{formatDate(item.dueDate)}</span>
          <span>
            <StatusBadge status={item.status} />
          </span>
          <span>
            <button
              type="button"
              className="icon-button"
              aria-label={`Edit ${item.name}`}
              onClick={(event) => {
                event.stopPropagation()
                onEdit(item)
              }}
            >
              ✎
            </button>
          </span>
        </div>
      ))}
    </div>
  )
}
