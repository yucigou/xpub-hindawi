const Joi = require('joi')

module.exports = {
  collection: { // project
    collectionType: Joi.string(),
    title: Joi.string(),
    status: Joi.string(),
    reviewers: Joi.array(),
  },
  fragment: { // version, projectReviewer, reviewer
    // version: Joi.number().required(),
    version: Joi.number(),
    submitted: Joi.date(),
    source: Joi.string(), // TODO: move to a file
    metadata: Joi.object({
      title: Joi.string(),
      abstract: Joi.string(),
      articleType: Joi.string(),
      articleSection: Joi.array().items(Joi.string()),
      authors: Joi.array(),
      keywords: Joi.array(),
    }),
    declarations: Joi.object().unknown(),
    suggestions: Joi.object({
      reviewers: Joi.object({
        suggested: Joi.array().items(Joi.string()),
        opposed: Joi.array().items(Joi.string())
      }),
      editors: Joi.object({
        suggested: Joi.array().items(Joi.string()),
        opposed: Joi.array().items(Joi.string())
      }),
    }),
    files: Joi.object({
      manuscript: Joi.object({
        name: Joi.string().required(),
        type: Joi.string(),
        size: Joi.number(),
        url: Joi.string()
      }),
      supplementary: Joi.array().items(Joi.object({
        name: Joi.string().required(),
        type: Joi.string(),
        size: Joi.number(),
        url: Joi.string()
      }))
    }),
    notes: Joi.object({
      fundingAcknowledgement: Joi.string(),
      specialInstructions: Joi.string()
    }),
    reviewers: Joi.array(),
    lock: Joi.object(),
    fragmentType: Joi.string(), // version, projectReviewer, reviewer
    parentVersion: Joi.string(), // reviewer
    projectReviewer: Joi.string(), // reviewer
    user: Joi.string(), // reviewer
    status: Joi.string(), // reviewer
    events: Joi.object(), // reviewer
  },
  user: {
    name: Joi.string(), // TODO: add "name" to the login form
    roles: Joi.object()
  },
  team: {
    group: Joi.string()
  }
}
