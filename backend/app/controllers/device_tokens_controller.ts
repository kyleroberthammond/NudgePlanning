import DeviceToken from '#models/device_token'
import { registerDeviceTokenValidator } from '#validators/device_token'
import type { HttpContext } from '@adonisjs/core/http'
import DeviceTokenTransformer from '#transformers/device_token_transformer'
import { DateTime } from 'luxon'

export default class DeviceTokensController {
  /**
   * Register (or re-register) a device for push notifications. Keyed on the
   * token itself rather than (user, platform): re-installing the app or
   * signing in as a different user on the same device just moves the
   * existing row over to whoever is logged in now.
   */
  async store({ auth, request, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const payload = await request.validateUsing(registerDeviceTokenValidator)

    const deviceToken = await DeviceToken.updateOrCreate(
      { token: payload.token },
      {
        userId: user.id,
        platform: payload.platform ?? 'android',
        lastUsedAt: DateTime.now(),
      }
    )

    return serialize(DeviceTokenTransformer.transform(deviceToken))
  }

  /**
   * Unregister a device, e.g. on logout — scoped to the current user so one
   * account can't drop another's token.
   */
  async destroy({ auth, params, response }: HttpContext) {
    const user = auth.getUserOrFail()

    await DeviceToken.query().where('token', params.token).where('userId', user.id).delete()

    return response.noContent()
  }
}
