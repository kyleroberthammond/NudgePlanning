import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_tokens.store': { paramsTuple?: []; params?: {} }
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'profile.access_tokens.destroy': { paramsTuple?: []; params?: {} }
    'projects.projects.index': { paramsTuple?: []; params?: {} }
    'projects.projects.store': { paramsTuple?: []; params?: {} }
    'projects.projects.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'projects.projects.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'device_tokens.store': { paramsTuple?: []; params?: {} }
    'device_tokens.destroy': { paramsTuple: [ParamValue]; params: {'token': ParamValue} }
    'push_test.store': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'projects.projects.index': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'projects.projects.index': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_tokens.store': { paramsTuple?: []; params?: {} }
    'profile.access_tokens.destroy': { paramsTuple?: []; params?: {} }
    'projects.projects.store': { paramsTuple?: []; params?: {} }
    'device_tokens.store': { paramsTuple?: []; params?: {} }
    'push_test.store': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'projects.projects.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'projects.projects.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'device_tokens.destroy': { paramsTuple: [ParamValue]; params: {'token': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}