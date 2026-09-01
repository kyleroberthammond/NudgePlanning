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
        // Projects
        router.get('projects', [controllers.Projects, 'index'])
        router.post('projects', [controllers.Projects, 'store'])
        router.get('projects/:id', [controllers.Projects, 'show'])
        router.put('projects/:id', [controllers.Projects, 'update'])
        router.delete('projects/:id', [controllers.Projects, 'destroy'])

        // Features (nested under a project; :id routes are top-level)
        router.get('projects/:projectId/features', [controllers.Features, 'index'])
        router.post('projects/:projectId/features', [controllers.Features, 'store'])
        router.get('features/:id', [controllers.Features, 'show'])
        router.put('features/:id', [controllers.Features, 'update'])
        router.delete('features/:id', [controllers.Features, 'destroy'])

        // Tasks (nested under a feature; :id routes are top-level)
        router.get('features/:featureId/tasks', [controllers.Tasks, 'index'])
        router.post('features/:featureId/tasks', [controllers.Tasks, 'store'])
        router.get('tasks/:id', [controllers.Tasks, 'show'])
        router.put('tasks/:id', [controllers.Tasks, 'update'])
        router.delete('tasks/:id', [controllers.Tasks, 'destroy'])

        // Releases (nested under a project; :id routes are top-level)
        router.get('projects/:projectId/releases', [controllers.Releases, 'index'])
        router.post('projects/:projectId/releases', [controllers.Releases, 'store'])
        router.get('releases/:id', [controllers.Releases, 'show'])
        router.put('releases/:id', [controllers.Releases, 'update'])
        router.delete('releases/:id', [controllers.Releases, 'destroy'])

        // Comments (nested under a feature or a task; :id delete is top-level).
        // Explicit .as() names below: two routes sharing a controller+method
        // otherwise collide on Adonis's auto-generated route name.
        router
          .get('features/:featureId/comments', [controllers.Comments, 'index'])
          .as('featureComments.index')
        router
          .post('features/:featureId/comments', [controllers.Comments, 'store'])
          .as('featureComments.store')
        router
          .get('tasks/:taskId/comments', [controllers.Comments, 'index'])
          .as('taskComments.index')
        router
          .post('tasks/:taskId/comments', [controllers.Comments, 'store'])
          .as('taskComments.store')
        router.delete('comments/:id', [controllers.Comments, 'destroy'])

        // Attachments (nested under a feature or a task; :id routes are top-level)
        router
          .get('features/:featureId/attachments', [controllers.Attachments, 'index'])
          .as('featureAttachments.index')
        router
          .post('features/:featureId/attachments', [controllers.Attachments, 'store'])
          .as('featureAttachments.store')
        router
          .get('tasks/:taskId/attachments', [controllers.Attachments, 'index'])
          .as('taskAttachments.index')
        router
          .post('tasks/:taskId/attachments', [controllers.Attachments, 'store'])
          .as('taskAttachments.store')
        router.get('attachments/:id/download', [controllers.Attachments, 'download'])
        router.delete('attachments/:id', [controllers.Attachments, 'destroy'])
      })
      .as('projects')
      .use(middleware.auth())
  })
  .prefix('/api/v1')
