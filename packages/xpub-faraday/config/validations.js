const Joi = require('joi')

module.exports = {
  collection: {
    // project
    collectionType: Joi.string(),
    created: Joi.date(),
    title: Joi.string(),
    status: Joi.string(),
    reviewers: Joi.array(),
  },
  fragment: [
    {
      fragmentType: Joi.valid('version').required(),
      created: Joi.date(),
      version: Joi.number(),
      submitted: Joi.date(),
      source: Joi.string(), // TODO: move to a file
      metadata: Joi.object({
        journal: Joi.string(),
        title: Joi.string(),
        abstract: Joi.string(),
        articleType: Joi.string(),
        articleSection: Joi.array().items(Joi.string()),
        // authors: Joi.array(),
        keywords: Joi.array(),
      }),
      declarations: Joi.array(),
      suggestions: Joi.object({
        reviewers: Joi.object({
          suggested: Joi.array().items(Joi.string()),
          opposed: Joi.array().items(Joi.string()),
        }),
        editors: Joi.object({
          suggested: Joi.array().items(Joi.string()),
          opposed: Joi.array().items(Joi.string()),
        }),
      }),
      files: Joi.object({
        manuscript: Joi.object({
          name: Joi.string().required(),
          type: Joi.string(),
          size: Joi.number(),
          url: Joi.string(),
        }),
        supplementary: Joi.array().items(
          Joi.object({
            name: Joi.string().required(),
            type: Joi.string(),
            size: Joi.number(),
            url: Joi.string(),
          }),
        ),
      }),
      notes: Joi.object({
        fundingAcknowledgement: Joi.string(),
        specialInstructions: Joi.string(),
      }),
      reviewers: Joi.array(),
      lock: Joi.object(),
      decision: Joi.object(),
      authors: Joi.array().items(
        Joi.object({
          first_name: Joi.string().required(),
          last_name: Joi.string().required(),
          middle_name: Joi.string().allow(''),
          email: Joi.string()
            .email()
            .required(),
          affiliation: Joi.string().required(),
          country: Joi.string().allow(''),
          is_submitting: Joi.boolean(),
          is_corresponding: Joi.boolean(),
        }),
      ),
    },
  ],
  user: {
    name: Joi.string(), // TODO: add "name" to the login form
    roles: Joi.object(),
  },
  team: {
    group: Joi.string(),
  },
}
