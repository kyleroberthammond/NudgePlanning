/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'auth.new_account.store': {
    methods: ["POST"]
    pattern: '/api/v1/auth/signup'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').signupValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').signupValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.access_tokens.store': {
    methods: ["POST"]
    pattern: '/api/v1/auth/login'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').loginValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').loginValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/access_tokens_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/access_tokens_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'profile.profile.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/account/profile'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/profile_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/profile_controller').default['show']>>>
    }
  }
  'profile.access_tokens.destroy': {
    methods: ["POST"]
    pattern: '/api/v1/account/logout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/access_tokens_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/access_tokens_controller').default['destroy']>>>
    }
  }
  'projects.projects.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/projects'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/projects_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/projects_controller').default['index']>>>
    }
  }
  'projects.projects.store': {
    methods: ["POST"]
    pattern: '/api/v1/projects'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/project').createProjectValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/project').createProjectValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/projects_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/projects_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'projects.projects.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/projects/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/projects_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/projects_controller').default['show']>>>
    }
  }
  'projects.projects.update': {
    methods: ["PUT"]
    pattern: '/api/v1/projects/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/project').updateProjectValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/project').updateProjectValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/projects_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/projects_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'projects.projects.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/projects/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/projects_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/projects_controller').default['destroy']>>>
    }
  }
  'projects.features.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/projects/:projectId/features'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { projectId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/features_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/features_controller').default['index']>>>
    }
  }
  'projects.features.store': {
    methods: ["POST"]
    pattern: '/api/v1/projects/:projectId/features'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/feature').createFeatureValidator)>>
      paramsTuple: [ParamValue]
      params: { projectId: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/feature').createFeatureValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/features_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/features_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'projects.features.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/features/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/features_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/features_controller').default['show']>>>
    }
  }
  'projects.features.update': {
    methods: ["PUT"]
    pattern: '/api/v1/features/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/feature').updateFeatureValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/feature').updateFeatureValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/features_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/features_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'projects.features.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/features/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/features_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/features_controller').default['destroy']>>>
    }
  }
  'projects.tasks.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/features/:featureId/tasks'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { featureId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/tasks_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/tasks_controller').default['index']>>>
    }
  }
  'projects.tasks.store': {
    methods: ["POST"]
    pattern: '/api/v1/features/:featureId/tasks'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/task').createTaskValidator)>>
      paramsTuple: [ParamValue]
      params: { featureId: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/task').createTaskValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/tasks_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/tasks_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'projects.tasks.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/tasks/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/tasks_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/tasks_controller').default['show']>>>
    }
  }
  'projects.tasks.update': {
    methods: ["PUT"]
    pattern: '/api/v1/tasks/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/task').updateTaskValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/task').updateTaskValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/tasks_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/tasks_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'projects.tasks.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/tasks/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/tasks_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/tasks_controller').default['destroy']>>>
    }
  }
  'projects.releases.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/projects/:projectId/releases'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { projectId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/releases_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/releases_controller').default['index']>>>
    }
  }
  'projects.releases.store': {
    methods: ["POST"]
    pattern: '/api/v1/projects/:projectId/releases'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/release').createReleaseValidator)>>
      paramsTuple: [ParamValue]
      params: { projectId: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/release').createReleaseValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/releases_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/releases_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'projects.releases.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/releases/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/releases_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/releases_controller').default['show']>>>
    }
  }
  'projects.releases.update': {
    methods: ["PUT"]
    pattern: '/api/v1/releases/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/release').updateReleaseValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/release').updateReleaseValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/releases_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/releases_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'projects.releases.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/releases/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/releases_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/releases_controller').default['destroy']>>>
    }
  }
  'projects.featureComments.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/features/:featureId/comments'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { featureId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/comments_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/comments_controller').default['index']>>>
    }
  }
  'projects.featureComments.store': {
    methods: ["POST"]
    pattern: '/api/v1/features/:featureId/comments'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/comment').createCommentValidator)>>
      paramsTuple: [ParamValue]
      params: { featureId: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/comment').createCommentValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/comments_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/comments_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'projects.taskComments.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/tasks/:taskId/comments'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { taskId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/comments_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/comments_controller').default['index']>>>
    }
  }
  'projects.taskComments.store': {
    methods: ["POST"]
    pattern: '/api/v1/tasks/:taskId/comments'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/comment').createCommentValidator)>>
      paramsTuple: [ParamValue]
      params: { taskId: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/comment').createCommentValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/comments_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/comments_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'projects.comments.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/comments/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/comments_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/comments_controller').default['destroy']>>>
    }
  }
  'projects.featureAttachments.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/features/:featureId/attachments'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { featureId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/attachments_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/attachments_controller').default['index']>>>
    }
  }
  'projects.featureAttachments.store': {
    methods: ["POST"]
    pattern: '/api/v1/features/:featureId/attachments'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { featureId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/attachments_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/attachments_controller').default['store']>>>
    }
  }
  'projects.taskAttachments.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/tasks/:taskId/attachments'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { taskId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/attachments_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/attachments_controller').default['index']>>>
    }
  }
  'projects.taskAttachments.store': {
    methods: ["POST"]
    pattern: '/api/v1/tasks/:taskId/attachments'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { taskId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/attachments_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/attachments_controller').default['store']>>>
    }
  }
  'projects.attachments.download': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/attachments/:id/download'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/attachments_controller').default['download']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/attachments_controller').default['download']>>>
    }
  }
  'projects.attachments.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/attachments/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/attachments_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/attachments_controller').default['destroy']>>>
    }
  }
}
