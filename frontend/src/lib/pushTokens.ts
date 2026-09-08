import { api } from './api'

/**
 * Registers this device's FCM token with the backend so it can receive
 * pushes for the signed-in user. Safe to call repeatedly — the backend
 * upserts on the token itself.
 */
export function registerDeviceToken(token: string, platform: 'android'): Promise<void> {
  return api.post('/account/device-tokens', { token, platform })
}

/**
 * Unregisters a device token, e.g. right before logging out. Best-effort —
 * callers should swallow failures rather than block sign-out on it.
 */
export function unregisterDeviceToken(token: string): Promise<void> {
  return api.delete(`/account/device-tokens/${encodeURIComponent(token)}`)
}

/** Asks the backend to send a test push to every device registered for the current user. */
export function sendTestPush(): Promise<{ sent: number; pruned: number }> {
  return api.post('/account/push-test')
}
