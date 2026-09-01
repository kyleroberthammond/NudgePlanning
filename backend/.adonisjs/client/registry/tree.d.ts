/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    newAccount: {
      store: typeof routes['auth.new_account.store']
    }
    accessTokens: {
      store: typeof routes['auth.access_tokens.store']
    }
  }
  profile: {
    profile: {
      show: typeof routes['profile.profile.show']
    }
    accessTokens: {
      destroy: typeof routes['profile.access_tokens.destroy']
    }
  }
  projects: {
    projects: {
      index: typeof routes['projects.projects.index']
      store: typeof routes['projects.projects.store']
      show: typeof routes['projects.projects.show']
      update: typeof routes['projects.projects.update']
      destroy: typeof routes['projects.projects.destroy']
    }
    features: {
      index: typeof routes['projects.features.index']
      store: typeof routes['projects.features.store']
      show: typeof routes['projects.features.show']
      update: typeof routes['projects.features.update']
      destroy: typeof routes['projects.features.destroy']
    }
    tasks: {
      index: typeof routes['projects.tasks.index']
      store: typeof routes['projects.tasks.store']
      show: typeof routes['projects.tasks.show']
      update: typeof routes['projects.tasks.update']
      destroy: typeof routes['projects.tasks.destroy']
    }
    releases: {
      index: typeof routes['projects.releases.index']
      store: typeof routes['projects.releases.store']
      show: typeof routes['projects.releases.show']
      update: typeof routes['projects.releases.update']
      destroy: typeof routes['projects.releases.destroy']
    }
    featureComments: {
      index: typeof routes['projects.featureComments.index']
      store: typeof routes['projects.featureComments.store']
    }
    taskComments: {
      index: typeof routes['projects.taskComments.index']
      store: typeof routes['projects.taskComments.store']
    }
    comments: {
      destroy: typeof routes['projects.comments.destroy']
    }
    featureAttachments: {
      index: typeof routes['projects.featureAttachments.index']
      store: typeof routes['projects.featureAttachments.store']
    }
    taskAttachments: {
      index: typeof routes['projects.taskAttachments.index']
      store: typeof routes['projects.taskAttachments.store']
    }
    attachments: {
      download: typeof routes['projects.attachments.download']
      destroy: typeof routes['projects.attachments.destroy']
    }
  }
}
