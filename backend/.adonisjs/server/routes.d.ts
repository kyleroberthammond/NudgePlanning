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
    'projects.projects.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'projects.projects.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'projects.projects.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'projects.features.index': { paramsTuple: [ParamValue]; params: {'projectId': ParamValue} }
    'projects.features.store': { paramsTuple: [ParamValue]; params: {'projectId': ParamValue} }
    'projects.features.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'projects.features.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'projects.features.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'projects.tasks.index': { paramsTuple: [ParamValue]; params: {'featureId': ParamValue} }
    'projects.tasks.store': { paramsTuple: [ParamValue]; params: {'featureId': ParamValue} }
    'projects.tasks.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'projects.tasks.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'projects.tasks.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'projects.releases.index': { paramsTuple: [ParamValue]; params: {'projectId': ParamValue} }
    'projects.releases.store': { paramsTuple: [ParamValue]; params: {'projectId': ParamValue} }
    'projects.releases.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'projects.releases.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'projects.releases.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'projects.featureComments.index': { paramsTuple: [ParamValue]; params: {'featureId': ParamValue} }
    'projects.featureComments.store': { paramsTuple: [ParamValue]; params: {'featureId': ParamValue} }
    'projects.taskComments.index': { paramsTuple: [ParamValue]; params: {'taskId': ParamValue} }
    'projects.taskComments.store': { paramsTuple: [ParamValue]; params: {'taskId': ParamValue} }
    'projects.comments.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'projects.featureAttachments.index': { paramsTuple: [ParamValue]; params: {'featureId': ParamValue} }
    'projects.featureAttachments.store': { paramsTuple: [ParamValue]; params: {'featureId': ParamValue} }
    'projects.taskAttachments.index': { paramsTuple: [ParamValue]; params: {'taskId': ParamValue} }
    'projects.taskAttachments.store': { paramsTuple: [ParamValue]; params: {'taskId': ParamValue} }
    'projects.attachments.download': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'projects.attachments.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  GET: {
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'projects.projects.index': { paramsTuple?: []; params?: {} }
    'projects.projects.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'projects.features.index': { paramsTuple: [ParamValue]; params: {'projectId': ParamValue} }
    'projects.features.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'projects.tasks.index': { paramsTuple: [ParamValue]; params: {'featureId': ParamValue} }
    'projects.tasks.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'projects.releases.index': { paramsTuple: [ParamValue]; params: {'projectId': ParamValue} }
    'projects.releases.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'projects.featureComments.index': { paramsTuple: [ParamValue]; params: {'featureId': ParamValue} }
    'projects.taskComments.index': { paramsTuple: [ParamValue]; params: {'taskId': ParamValue} }
    'projects.featureAttachments.index': { paramsTuple: [ParamValue]; params: {'featureId': ParamValue} }
    'projects.taskAttachments.index': { paramsTuple: [ParamValue]; params: {'taskId': ParamValue} }
    'projects.attachments.download': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  HEAD: {
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'projects.projects.index': { paramsTuple?: []; params?: {} }
    'projects.projects.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'projects.features.index': { paramsTuple: [ParamValue]; params: {'projectId': ParamValue} }
    'projects.features.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'projects.tasks.index': { paramsTuple: [ParamValue]; params: {'featureId': ParamValue} }
    'projects.tasks.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'projects.releases.index': { paramsTuple: [ParamValue]; params: {'projectId': ParamValue} }
    'projects.releases.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'projects.featureComments.index': { paramsTuple: [ParamValue]; params: {'featureId': ParamValue} }
    'projects.taskComments.index': { paramsTuple: [ParamValue]; params: {'taskId': ParamValue} }
    'projects.featureAttachments.index': { paramsTuple: [ParamValue]; params: {'featureId': ParamValue} }
    'projects.taskAttachments.index': { paramsTuple: [ParamValue]; params: {'taskId': ParamValue} }
    'projects.attachments.download': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  POST: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_tokens.store': { paramsTuple?: []; params?: {} }
    'profile.access_tokens.destroy': { paramsTuple?: []; params?: {} }
    'projects.projects.store': { paramsTuple?: []; params?: {} }
    'projects.features.store': { paramsTuple: [ParamValue]; params: {'projectId': ParamValue} }
    'projects.tasks.store': { paramsTuple: [ParamValue]; params: {'featureId': ParamValue} }
    'projects.releases.store': { paramsTuple: [ParamValue]; params: {'projectId': ParamValue} }
    'projects.featureComments.store': { paramsTuple: [ParamValue]; params: {'featureId': ParamValue} }
    'projects.taskComments.store': { paramsTuple: [ParamValue]; params: {'taskId': ParamValue} }
    'projects.featureAttachments.store': { paramsTuple: [ParamValue]; params: {'featureId': ParamValue} }
    'projects.taskAttachments.store': { paramsTuple: [ParamValue]; params: {'taskId': ParamValue} }
  }
  PUT: {
    'projects.projects.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'projects.features.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'projects.tasks.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'projects.releases.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'projects.projects.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'projects.features.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'projects.tasks.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'projects.releases.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'projects.comments.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'projects.attachments.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}