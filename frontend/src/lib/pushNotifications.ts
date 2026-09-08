import { Capacitor } from '@capacitor/core'
import { PushNotifications } from '@capacitor/push-notifications'
import { registerDeviceToken, unregisterDeviceToken } from './pushTokens'

const TOKEN_KEY = 'nudgeplanning.deviceToken'
let listenersAttached = false

function getStoredDeviceToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

function rememberToken(token: string | null): void {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token)
  } else {
    localStorage.removeItem(TOKEN_KEY)
  }
}

function attachListenersOnce(): void {
  if (listenersAttached) return
  listenersAttached = true

  PushNotifications.addListener('registration', (token) => {
    rememberToken(token.value)
    void registerDeviceToken(token.value, 'android')
  })

  PushNotifications.addListener('registrationError', (error) => {
    console.error('Push notification registration failed', error)
  })

  PushNotifications.addListener('pushNotificationReceived', (notification) => {
    // Fired when a push arrives while the app is in the foreground — Android
    // doesn't surface a system notification for these on its own.
    console.log('Push notification received in foreground', notification)
  })

  PushNotifications.addListener('pushNotificationActionPerformed', (action) => {
    console.log('Push notification tapped', action.notification)
  })
}

/**
 * Requests notification permission and registers this device for push
 * notifications, sending the resulting token to the backend. No-ops outside
 * the native Android app (e.g. in the browser during `npm run dev`).
 *
 * Call this once the user is authenticated — the token gets tied to
 * whoever is signed in at the moment it's registered.
 */
export async function initPushNotifications(): Promise<void> {
  if (!Capacitor.isNativePlatform()) return

  attachListenersOnce()

  const current = await PushNotifications.checkPermissions()
  let state = current.receive
  if (state === 'prompt' || state === 'prompt-with-rationale') {
    state = (await PushNotifications.requestPermissions()).receive
  }
  if (state !== 'granted') return

  await PushNotifications.register()
}

/** Unregisters this device from push notifications — call this on logout. */
export async function teardownPushNotifications(): Promise<void> {
  if (!Capacitor.isNativePlatform()) return

  const token = getStoredDeviceToken()
  rememberToken(null)

  try {
    await PushNotifications.unregister()
  } catch {
    // Best-effort — the server-side token is still dropped below.
  }

  if (token) {
    try {
      await unregisterDeviceToken(token)
    } catch {
      // Best-effort — a token left behind just fails to deliver silently
      // and gets pruned server-side the next time a push bounces.
    }
  }
}
