/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'auth.new_account.store': {
    methods: ["POST"],
    pattern: '/api/v1/auth/signup',
    tokens: [{"old":"/api/v1/auth/signup","type":0,"val":"api","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['auth.new_account.store']['types'],
  },
  'auth.access_tokens.store': {
    methods: ["POST"],
    pattern: '/api/v1/auth/login',
    tokens: [{"old":"/api/v1/auth/login","type":0,"val":"api","end":""},{"old":"/api/v1/auth/login","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/login","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.access_tokens.store']['types'],
  },
  'profile.profile.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/account/profile',
    tokens: [{"old":"/api/v1/account/profile","type":0,"val":"api","end":""},{"old":"/api/v1/account/profile","type":0,"val":"v1","end":""},{"old":"/api/v1/account/profile","type":0,"val":"account","end":""},{"old":"/api/v1/account/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['profile.profile.show']['types'],
  },
  'profile.access_tokens.destroy': {
    methods: ["POST"],
    pattern: '/api/v1/account/logout',
    tokens: [{"old":"/api/v1/account/logout","type":0,"val":"api","end":""},{"old":"/api/v1/account/logout","type":0,"val":"v1","end":""},{"old":"/api/v1/account/logout","type":0,"val":"account","end":""},{"old":"/api/v1/account/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['profile.access_tokens.destroy']['types'],
  },
  'projects.projects.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/projects',
    tokens: [{"old":"/api/v1/projects","type":0,"val":"api","end":""},{"old":"/api/v1/projects","type":0,"val":"v1","end":""},{"old":"/api/v1/projects","type":0,"val":"projects","end":""}],
    types: placeholder as Registry['projects.projects.index']['types'],
  },
  'projects.projects.store': {
    methods: ["POST"],
    pattern: '/api/v1/projects',
    tokens: [{"old":"/api/v1/projects","type":0,"val":"api","end":""},{"old":"/api/v1/projects","type":0,"val":"v1","end":""},{"old":"/api/v1/projects","type":0,"val":"projects","end":""}],
    types: placeholder as Registry['projects.projects.store']['types'],
  },
  'projects.projects.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/projects/:id',
    tokens: [{"old":"/api/v1/projects/:id","type":0,"val":"api","end":""},{"old":"/api/v1/projects/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/projects/:id","type":0,"val":"projects","end":""},{"old":"/api/v1/projects/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['projects.projects.show']['types'],
  },
  'projects.projects.update': {
    methods: ["PUT"],
    pattern: '/api/v1/projects/:id',
    tokens: [{"old":"/api/v1/projects/:id","type":0,"val":"api","end":""},{"old":"/api/v1/projects/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/projects/:id","type":0,"val":"projects","end":""},{"old":"/api/v1/projects/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['projects.projects.update']['types'],
  },
  'projects.projects.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/projects/:id',
    tokens: [{"old":"/api/v1/projects/:id","type":0,"val":"api","end":""},{"old":"/api/v1/projects/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/projects/:id","type":0,"val":"projects","end":""},{"old":"/api/v1/projects/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['projects.projects.destroy']['types'],
  },
  'projects.features.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/projects/:projectId/features',
    tokens: [{"old":"/api/v1/projects/:projectId/features","type":0,"val":"api","end":""},{"old":"/api/v1/projects/:projectId/features","type":0,"val":"v1","end":""},{"old":"/api/v1/projects/:projectId/features","type":0,"val":"projects","end":""},{"old":"/api/v1/projects/:projectId/features","type":1,"val":"projectId","end":""},{"old":"/api/v1/projects/:projectId/features","type":0,"val":"features","end":""}],
    types: placeholder as Registry['projects.features.index']['types'],
  },
  'projects.features.store': {
    methods: ["POST"],
    pattern: '/api/v1/projects/:projectId/features',
    tokens: [{"old":"/api/v1/projects/:projectId/features","type":0,"val":"api","end":""},{"old":"/api/v1/projects/:projectId/features","type":0,"val":"v1","end":""},{"old":"/api/v1/projects/:projectId/features","type":0,"val":"projects","end":""},{"old":"/api/v1/projects/:projectId/features","type":1,"val":"projectId","end":""},{"old":"/api/v1/projects/:projectId/features","type":0,"val":"features","end":""}],
    types: placeholder as Registry['projects.features.store']['types'],
  },
  'projects.features.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/features/:id',
    tokens: [{"old":"/api/v1/features/:id","type":0,"val":"api","end":""},{"old":"/api/v1/features/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/features/:id","type":0,"val":"features","end":""},{"old":"/api/v1/features/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['projects.features.show']['types'],
  },
  'projects.features.update': {
    methods: ["PUT"],
    pattern: '/api/v1/features/:id',
    tokens: [{"old":"/api/v1/features/:id","type":0,"val":"api","end":""},{"old":"/api/v1/features/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/features/:id","type":0,"val":"features","end":""},{"old":"/api/v1/features/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['projects.features.update']['types'],
  },
  'projects.features.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/features/:id',
    tokens: [{"old":"/api/v1/features/:id","type":0,"val":"api","end":""},{"old":"/api/v1/features/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/features/:id","type":0,"val":"features","end":""},{"old":"/api/v1/features/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['projects.features.destroy']['types'],
  },
  'projects.tasks.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/features/:featureId/tasks',
    tokens: [{"old":"/api/v1/features/:featureId/tasks","type":0,"val":"api","end":""},{"old":"/api/v1/features/:featureId/tasks","type":0,"val":"v1","end":""},{"old":"/api/v1/features/:featureId/tasks","type":0,"val":"features","end":""},{"old":"/api/v1/features/:featureId/tasks","type":1,"val":"featureId","end":""},{"old":"/api/v1/features/:featureId/tasks","type":0,"val":"tasks","end":""}],
    types: placeholder as Registry['projects.tasks.index']['types'],
  },
  'projects.tasks.store': {
    methods: ["POST"],
    pattern: '/api/v1/features/:featureId/tasks',
    tokens: [{"old":"/api/v1/features/:featureId/tasks","type":0,"val":"api","end":""},{"old":"/api/v1/features/:featureId/tasks","type":0,"val":"v1","end":""},{"old":"/api/v1/features/:featureId/tasks","type":0,"val":"features","end":""},{"old":"/api/v1/features/:featureId/tasks","type":1,"val":"featureId","end":""},{"old":"/api/v1/features/:featureId/tasks","type":0,"val":"tasks","end":""}],
    types: placeholder as Registry['projects.tasks.store']['types'],
  },
  'projects.tasks.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/tasks/:id',
    tokens: [{"old":"/api/v1/tasks/:id","type":0,"val":"api","end":""},{"old":"/api/v1/tasks/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/tasks/:id","type":0,"val":"tasks","end":""},{"old":"/api/v1/tasks/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['projects.tasks.show']['types'],
  },
  'projects.tasks.update': {
    methods: ["PUT"],
    pattern: '/api/v1/tasks/:id',
    tokens: [{"old":"/api/v1/tasks/:id","type":0,"val":"api","end":""},{"old":"/api/v1/tasks/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/tasks/:id","type":0,"val":"tasks","end":""},{"old":"/api/v1/tasks/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['projects.tasks.update']['types'],
  },
  'projects.tasks.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/tasks/:id',
    tokens: [{"old":"/api/v1/tasks/:id","type":0,"val":"api","end":""},{"old":"/api/v1/tasks/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/tasks/:id","type":0,"val":"tasks","end":""},{"old":"/api/v1/tasks/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['projects.tasks.destroy']['types'],
  },
  'projects.releases.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/projects/:projectId/releases',
    tokens: [{"old":"/api/v1/projects/:projectId/releases","type":0,"val":"api","end":""},{"old":"/api/v1/projects/:projectId/releases","type":0,"val":"v1","end":""},{"old":"/api/v1/projects/:projectId/releases","type":0,"val":"projects","end":""},{"old":"/api/v1/projects/:projectId/releases","type":1,"val":"projectId","end":""},{"old":"/api/v1/projects/:projectId/releases","type":0,"val":"releases","end":""}],
    types: placeholder as Registry['projects.releases.index']['types'],
  },
  'projects.releases.store': {
    methods: ["POST"],
    pattern: '/api/v1/projects/:projectId/releases',
    tokens: [{"old":"/api/v1/projects/:projectId/releases","type":0,"val":"api","end":""},{"old":"/api/v1/projects/:projectId/releases","type":0,"val":"v1","end":""},{"old":"/api/v1/projects/:projectId/releases","type":0,"val":"projects","end":""},{"old":"/api/v1/projects/:projectId/releases","type":1,"val":"projectId","end":""},{"old":"/api/v1/projects/:projectId/releases","type":0,"val":"releases","end":""}],
    types: placeholder as Registry['projects.releases.store']['types'],
  },
  'projects.releases.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/releases/:id',
    tokens: [{"old":"/api/v1/releases/:id","type":0,"val":"api","end":""},{"old":"/api/v1/releases/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/releases/:id","type":0,"val":"releases","end":""},{"old":"/api/v1/releases/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['projects.releases.show']['types'],
  },
  'projects.releases.update': {
    methods: ["PUT"],
    pattern: '/api/v1/releases/:id',
    tokens: [{"old":"/api/v1/releases/:id","type":0,"val":"api","end":""},{"old":"/api/v1/releases/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/releases/:id","type":0,"val":"releases","end":""},{"old":"/api/v1/releases/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['projects.releases.update']['types'],
  },
  'projects.releases.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/releases/:id',
    tokens: [{"old":"/api/v1/releases/:id","type":0,"val":"api","end":""},{"old":"/api/v1/releases/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/releases/:id","type":0,"val":"releases","end":""},{"old":"/api/v1/releases/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['projects.releases.destroy']['types'],
  },
  'projects.featureComments.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/features/:featureId/comments',
    tokens: [{"old":"/api/v1/features/:featureId/comments","type":0,"val":"api","end":""},{"old":"/api/v1/features/:featureId/comments","type":0,"val":"v1","end":""},{"old":"/api/v1/features/:featureId/comments","type":0,"val":"features","end":""},{"old":"/api/v1/features/:featureId/comments","type":1,"val":"featureId","end":""},{"old":"/api/v1/features/:featureId/comments","type":0,"val":"comments","end":""}],
    types: placeholder as Registry['projects.featureComments.index']['types'],
  },
  'projects.featureComments.store': {
    methods: ["POST"],
    pattern: '/api/v1/features/:featureId/comments',
    tokens: [{"old":"/api/v1/features/:featureId/comments","type":0,"val":"api","end":""},{"old":"/api/v1/features/:featureId/comments","type":0,"val":"v1","end":""},{"old":"/api/v1/features/:featureId/comments","type":0,"val":"features","end":""},{"old":"/api/v1/features/:featureId/comments","type":1,"val":"featureId","end":""},{"old":"/api/v1/features/:featureId/comments","type":0,"val":"comments","end":""}],
    types: placeholder as Registry['projects.featureComments.store']['types'],
  },
  'projects.taskComments.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/tasks/:taskId/comments',
    tokens: [{"old":"/api/v1/tasks/:taskId/comments","type":0,"val":"api","end":""},{"old":"/api/v1/tasks/:taskId/comments","type":0,"val":"v1","end":""},{"old":"/api/v1/tasks/:taskId/comments","type":0,"val":"tasks","end":""},{"old":"/api/v1/tasks/:taskId/comments","type":1,"val":"taskId","end":""},{"old":"/api/v1/tasks/:taskId/comments","type":0,"val":"comments","end":""}],
    types: placeholder as Registry['projects.taskComments.index']['types'],
  },
  'projects.taskComments.store': {
    methods: ["POST"],
    pattern: '/api/v1/tasks/:taskId/comments',
    tokens: [{"old":"/api/v1/tasks/:taskId/comments","type":0,"val":"api","end":""},{"old":"/api/v1/tasks/:taskId/comments","type":0,"val":"v1","end":""},{"old":"/api/v1/tasks/:taskId/comments","type":0,"val":"tasks","end":""},{"old":"/api/v1/tasks/:taskId/comments","type":1,"val":"taskId","end":""},{"old":"/api/v1/tasks/:taskId/comments","type":0,"val":"comments","end":""}],
    types: placeholder as Registry['projects.taskComments.store']['types'],
  },
  'projects.comments.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/comments/:id',
    tokens: [{"old":"/api/v1/comments/:id","type":0,"val":"api","end":""},{"old":"/api/v1/comments/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/comments/:id","type":0,"val":"comments","end":""},{"old":"/api/v1/comments/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['projects.comments.destroy']['types'],
  },
  'projects.featureAttachments.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/features/:featureId/attachments',
    tokens: [{"old":"/api/v1/features/:featureId/attachments","type":0,"val":"api","end":""},{"old":"/api/v1/features/:featureId/attachments","type":0,"val":"v1","end":""},{"old":"/api/v1/features/:featureId/attachments","type":0,"val":"features","end":""},{"old":"/api/v1/features/:featureId/attachments","type":1,"val":"featureId","end":""},{"old":"/api/v1/features/:featureId/attachments","type":0,"val":"attachments","end":""}],
    types: placeholder as Registry['projects.featureAttachments.index']['types'],
  },
  'projects.featureAttachments.store': {
    methods: ["POST"],
    pattern: '/api/v1/features/:featureId/attachments',
    tokens: [{"old":"/api/v1/features/:featureId/attachments","type":0,"val":"api","end":""},{"old":"/api/v1/features/:featureId/attachments","type":0,"val":"v1","end":""},{"old":"/api/v1/features/:featureId/attachments","type":0,"val":"features","end":""},{"old":"/api/v1/features/:featureId/attachments","type":1,"val":"featureId","end":""},{"old":"/api/v1/features/:featureId/attachments","type":0,"val":"attachments","end":""}],
    types: placeholder as Registry['projects.featureAttachments.store']['types'],
  },
  'projects.taskAttachments.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/tasks/:taskId/attachments',
    tokens: [{"old":"/api/v1/tasks/:taskId/attachments","type":0,"val":"api","end":""},{"old":"/api/v1/tasks/:taskId/attachments","type":0,"val":"v1","end":""},{"old":"/api/v1/tasks/:taskId/attachments","type":0,"val":"tasks","end":""},{"old":"/api/v1/tasks/:taskId/attachments","type":1,"val":"taskId","end":""},{"old":"/api/v1/tasks/:taskId/attachments","type":0,"val":"attachments","end":""}],
    types: placeholder as Registry['projects.taskAttachments.index']['types'],
  },
  'projects.taskAttachments.store': {
    methods: ["POST"],
    pattern: '/api/v1/tasks/:taskId/attachments',
    tokens: [{"old":"/api/v1/tasks/:taskId/attachments","type":0,"val":"api","end":""},{"old":"/api/v1/tasks/:taskId/attachments","type":0,"val":"v1","end":""},{"old":"/api/v1/tasks/:taskId/attachments","type":0,"val":"tasks","end":""},{"old":"/api/v1/tasks/:taskId/attachments","type":1,"val":"taskId","end":""},{"old":"/api/v1/tasks/:taskId/attachments","type":0,"val":"attachments","end":""}],
    types: placeholder as Registry['projects.taskAttachments.store']['types'],
  },
  'projects.attachments.download': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/attachments/:id/download',
    tokens: [{"old":"/api/v1/attachments/:id/download","type":0,"val":"api","end":""},{"old":"/api/v1/attachments/:id/download","type":0,"val":"v1","end":""},{"old":"/api/v1/attachments/:id/download","type":0,"val":"attachments","end":""},{"old":"/api/v1/attachments/:id/download","type":1,"val":"id","end":""},{"old":"/api/v1/attachments/:id/download","type":0,"val":"download","end":""}],
    types: placeholder as Registry['projects.attachments.download']['types'],
  },
  'projects.attachments.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/attachments/:id',
    tokens: [{"old":"/api/v1/attachments/:id","type":0,"val":"api","end":""},{"old":"/api/v1/attachments/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/attachments/:id","type":0,"val":"attachments","end":""},{"old":"/api/v1/attachments/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['projects.attachments.destroy']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
