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
  'device_tokens.store': {
    methods: ["POST"],
    pattern: '/api/v1/account/device-tokens',
    tokens: [{"old":"/api/v1/account/device-tokens","type":0,"val":"api","end":""},{"old":"/api/v1/account/device-tokens","type":0,"val":"v1","end":""},{"old":"/api/v1/account/device-tokens","type":0,"val":"account","end":""},{"old":"/api/v1/account/device-tokens","type":0,"val":"device-tokens","end":""}],
    types: placeholder as Registry['device_tokens.store']['types'],
  },
  'device_tokens.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/account/device-tokens/:token',
    tokens: [{"old":"/api/v1/account/device-tokens/:token","type":0,"val":"api","end":""},{"old":"/api/v1/account/device-tokens/:token","type":0,"val":"v1","end":""},{"old":"/api/v1/account/device-tokens/:token","type":0,"val":"account","end":""},{"old":"/api/v1/account/device-tokens/:token","type":0,"val":"device-tokens","end":""},{"old":"/api/v1/account/device-tokens/:token","type":1,"val":"token","end":""}],
    types: placeholder as Registry['device_tokens.destroy']['types'],
  },
  'push_test.store': {
    methods: ["POST"],
    pattern: '/api/v1/account/push-test',
    tokens: [{"old":"/api/v1/account/push-test","type":0,"val":"api","end":""},{"old":"/api/v1/account/push-test","type":0,"val":"v1","end":""},{"old":"/api/v1/account/push-test","type":0,"val":"account","end":""},{"old":"/api/v1/account/push-test","type":0,"val":"push-test","end":""}],
    types: placeholder as Registry['push_test.store']['types'],
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
