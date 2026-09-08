/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'

router.get('/', () => {
  return { hello: 'world' }
})

router
  .group(() => {
    router
      .group(() => {
        router.post('signup', [controllers.NewAccount, 'store'])
        router.post('login', [controllers.AccessTokens, 'store'])
      })
      .prefix('auth')
      .as('auth')

    router
      .group(() => {
        router.get('profile', [controllers.Profile, 'show'])
        router.post('logout', [controllers.AccessTokens, 'destroy'])
      })
      .prefix('account')
      .as('profile')
      .use(middleware.auth())

    router
      .group(() => {
        router.get('projects', [controllers.Projects, 'index'])
        router.post('projects', [controllers.Projects, 'store'])
        router.put('projects/:id', [controllers.Projects, 'update'])
        router.delete('projects/:id', [controllers.Projects, 'destroy'])
      })
      .as('projects')
      .use(middleware.auth())

    router
      .group(() => {
        router.post('account/device-tokens', [controllers.DeviceTokens, 'store'])
        router.delete('account/device-tokens/:token', [controllers.DeviceTokens, 'destroy'])
        router.post('account/push-test', [controllers.PushTest, 'store'])
      })
      .use(middleware.auth())
  })
  .prefix('/api/v1')
