import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Comment } from '../../types'

interface CommentsPanelProps {
  comments: Comment[]
  currentUserId: number | undefined
  onAdd: (body: string) => Promise<void>
  onDelete: (id: number) => Promise<void>
}

function formatTimestamp(iso: string): string {
  return new Date(iso).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export function CommentsPanel({ comments, currentUserId, onAdd, onDelete }: CommentsPanelProps) {
  const [body, setBody] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!body.trim()) return
    setSubmitting(true)
    setError(null)
    try {
      await onAdd(body.trim())
      setBody('')
    } catch {
      setError('Could not post the comment.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="panel">
      <h3>Comments {comments.length > 0 && <span className="panel-count">{comments.length}</span>}</h3>

      {comments.length === 0 && <p className="panel-empty">No comments yet.</p>}

      <ul className="comment-list">
        {comments.map((comment) => (
          <li key={comment.id} className="comment">
            <div className="avatar avatar-sm">{comment.author.initials}</div>
            <div className="comment-body">
              <div className="comment-meta">
                <span className="comment-author">{comment.author.fullName ?? 'Someone'}</span>
                <span className="comment-time">{formatTimestamp(comment.createdAt)}</span>
              </div>
              <p>{comment.body}</p>
            </div>
            {comment.author.id === currentUserId && (
              <button
                type="button"
                className="icon-button"
                aria-label="Delete comment"
                onClick={() => void onDelete(comment.id)}
              >
                ✕
              </button>
            )}
          </li>
        ))}
      </ul>

      {error && <div className="form-error">{error}</div>}

      <form className="comment-form" onSubmit={handleSubmit}>
        <textarea
          placeholder="Write a comment…"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={2}
        />
        <button className="primary" type="submit" disabled={submitting || !body.trim()}>
          {submitting ? 'Posting…' : 'Comment'}
        </button>
      </form>
    </div>
  )
}
