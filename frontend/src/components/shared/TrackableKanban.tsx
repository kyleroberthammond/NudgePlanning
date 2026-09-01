import { useState } from 'react'
import type { DragEvent, ReactNode } from 'react'
import { formatDate } from '../../lib/format'
import { ITEM_STATUSES, ITEM_STATUS_LABELS } from '../../types'
import type { ItemStatus, TrackableItem } from '../../types'

interface TrackableKanbanProps<T extends TrackableItem> {
  items: T[]
  onOpen: (item: T) => void
  onEdit: (item: T) => void
  onStatusChange: (id: number, status: ItemStatus) => void
  emptyLabel?: string
  renderMeta?: (item: T) => ReactNode
}

export function TrackableKanban<T extends TrackableItem>({
  items,
  onOpen,
  onEdit,
  onStatusChange,
  emptyLabel = 'No items',
  renderMeta,
}: TrackableKanbanProps<T>) {
  const [draggingId, setDraggingId] = useState<number | null>(null)
  const [overColumn, setOverColumn] = useState<ItemStatus | null>(null)

  function handleDrop(status: ItemStatus) {
    return (event: DragEvent) => {
      event.preventDefault()
      setOverColumn(null)
      const id = Number(event.dataTransfer.getData('text/plain'))
      const item = items.find((i) => i.id === id)
      if (item && item.status !== status) {
        onStatusChange(id, status)
      }
      setDraggingId(null)
    }
  }

  return (
    <div className="kanban">
      {ITEM_STATUSES.map((status) => {
        const columnItems = items.filter((item) => item.status === status)
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
              <span>{ITEM_STATUS_LABELS[status]}</span>
              <span className="kanban-count">{columnItems.length}</span>
            </div>

            <div className="kanban-column-body">
              {columnItems.map((item) => (
                <div
                  key={item.id}
                  className={`kanban-card ${draggingId === item.id ? 'dragging' : ''}`}
                  draggable
                  onDragStart={(event) => {
                    event.dataTransfer.setData('text/plain', String(item.id))
                    event.dataTransfer.effectAllowed = 'move'
                    setDraggingId(item.id)
                  }}
                  onDragEnd={() => setDraggingId(null)}
                  onClick={() => onOpen(item)}
                >
                  <div className="kanban-card-top">
                    <div className="kanban-card-name">{item.name}</div>
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
                  </div>
                  {(item.startDate || item.dueDate) && (
                    <div className="kanban-card-dates">
                      {formatDate(item.startDate)} → {formatDate(item.dueDate)}
                    </div>
                  )}
                  {renderMeta && <div className="kanban-card-meta">{renderMeta(item)}</div>}
                </div>
              ))}
              {columnItems.length === 0 && <div className="kanban-empty">{emptyLabel}</div>}
            </div>
          </div>
        )
      })}
    </div>
  )
}
