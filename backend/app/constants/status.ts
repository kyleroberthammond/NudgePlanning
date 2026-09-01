/**
 * Shared status vocabulary for every trackable item (projects, features,
 * tasks). Keeping one enum means one badge component and one status
 * selector cover the whole app.
 */
export const ITEM_STATUSES = ['not_started', 'in_progress', 'on_hold', 'completed'] as const
export type ItemStatus = (typeof ITEM_STATUSES)[number]
