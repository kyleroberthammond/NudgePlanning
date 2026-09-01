/** Formats a "YYYY-MM-DD" date string for display, e.g. "Sep 1, 2026". */
export function formatDate(date: string | null): string {
  if (!date) return '—'
  const [year, month, day] = date.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
