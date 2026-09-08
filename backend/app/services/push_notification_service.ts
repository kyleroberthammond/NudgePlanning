import env from '#start/env'
import DeviceToken from '#models/device_token'
import type User from '#models/user'
import { cert, getApps, initializeApp } from 'firebase-admin/app'
import { getMessaging, type Messaging } from 'firebase-admin/messaging'

export interface PushNotificationPayload {
  title: string
  body: string
  data?: Record<string, string>
}

export interface PushSendResult {
  sent: number
  pruned: number
}

function credentialsConfigured(): boolean {
  return Boolean(
    env.get('FIREBASE_PROJECT_ID') &&
    env.get('FIREBASE_CLIENT_EMAIL') &&
    env.get('FIREBASE_PRIVATE_KEY')
  )
}

let messaging: Messaging | null = null

function getFirebaseMessaging(): Messaging {
  if (!credentialsConfigured()) {
    throw new Error(
      'Firebase is not configured — set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL and ' +
        'FIREBASE_PRIVATE_KEY (from a Firebase service account key) to send push notifications.'
    )
  }

  if (!messaging) {
    const firebaseApp =
      getApps()[0] ??
      initializeApp({
        credential: cert({
          projectId: env.get('FIREBASE_PROJECT_ID'),
          clientEmail: env.get('FIREBASE_CLIENT_EMAIL'),
          // .env files can't hold literal newlines — the private key from the
          // downloaded JSON is stored with escaped "\n" sequences, so it has
          // to be unescaped before handing it to the SDK.
          privateKey: env.get('FIREBASE_PRIVATE_KEY')!.replace(/\\n/g, '\n'),
        }),
      })
    messaging = getMessaging(firebaseApp)
  }

  return messaging
}

export default class PushNotificationService {
  static isConfigured(): boolean {
    return credentialsConfigured()
  }

  /**
   * Sends a push notification to every device registered to the given user,
   * pruning any tokens FCM reports as no longer valid (app uninstalled,
   * token rotated, etc).
   */
  static async sendToUser(user: User, payload: PushNotificationPayload): Promise<PushSendResult> {
    const deviceTokens = await DeviceToken.query().where('userId', user.id)
    if (deviceTokens.length === 0) {
      return { sent: 0, pruned: 0 }
    }

    const response = await getFirebaseMessaging().sendEachForMulticast({
      tokens: deviceTokens.map((deviceToken) => deviceToken.token),
      notification: { title: payload.title, body: payload.body },
      data: payload.data,
    })

    const staleTokenIds = response.responses
      .map((result, index) => ({ result, deviceToken: deviceTokens[index] }))
      .filter(({ result }) => {
        const code = result.error?.code
        return (
          !result.success &&
          (code === 'messaging/registration-token-not-registered' ||
            code === 'messaging/invalid-registration-token')
        )
      })
      .map(({ deviceToken }) => deviceToken.id)

    if (staleTokenIds.length > 0) {
      await DeviceToken.query().whereIn('id', staleTokenIds).delete()
    }

    return { sent: response.successCount, pruned: staleTokenIds.length }
  }
}
