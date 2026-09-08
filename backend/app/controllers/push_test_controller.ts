import type { HttpContext } from '@adonisjs/core/http'
import PushNotificationService from '#services/push_notification_service'

/**
 * Manual trigger for verifying the push notification pipeline end to end:
 * register a device from the app, then hit this endpoint and confirm the
 * notification shows up on the device.
 */
export default class PushTestController {
  async store({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()

    if (!PushNotificationService.isConfigured()) {
      return response.badRequest({
        errors: [
          {
            message:
              'Firebase is not configured on the server — set FIREBASE_PROJECT_ID, ' +
              'FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY.',
          },
        ],
      })
    }

    const result = await PushNotificationService.sendToUser(user, {
      title: 'NudgePlanning',
      body: 'This is a test notification 👋',
    })

    return result
  }
}
