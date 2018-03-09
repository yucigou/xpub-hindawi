const Joi = require('joi')

module.exports = {
  collection: {
    // project
    collectionType: Joi.string(),
    created: Joi.date(),
    title: Joi.string(),
    status: Joi.string(),
    reviewers: Joi.array(),
    customId: Joi.string(),
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
        issue: Joi.string(),
        title: Joi.string(),
        abstract: Joi.string(),
        type: Joi.string(),
      }),
      declarations: Joi.array(),
      conflicts: Joi.object({
        hasConflicts: Joi.any().valid(['yes', 'no']),
        message: Joi.string(),
      }),
      files: Joi.object({
        manuscript: Joi.any(),
        manuscripts: Joi.array().items(
          Joi.object({
            id: Joi.string(),
            name: Joi.string().required(),
            type: Joi.string(),
            size: Joi.number(),
            url: Joi.string(),
            signedUrl: Joi.string(),
          }),
        ),
        supplementary: Joi.array().items(
          Joi.object({
            id: Joi.string(),
            name: Joi.string().required(),
            type: Joi.string(),
            size: Joi.number(),
            url: Joi.string(),
            signedUrl: Joi.string(),
          }),
        ),
        coverLetter: Joi.array().items(
          Joi.object({
            id: Joi.string(),
            name: Joi.string().required(),
            type: Joi.string(),
            size: Joi.number(),
            url: Joi.string(),
            signedUrl: Joi.string(),
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
          firstName: Joi.string().required(),
          lastName: Joi.string().required(),
          middleName: Joi.string().allow(''),
          email: Joi.string()
            .email()
            .required(),
          affiliation: Joi.string().required(),
          country: Joi.string().allow(''),
          isSubmitting: Joi.boolean(),
          isCorresponding: Joi.boolean(),
          id: Joi.string().uuid(),
        }),
      ),
    },
  ],
  user: {
    name: Joi.string(),
    username: Joi.string(),
    roles: Joi.array(),
    isConfirmed: Joi.boolean(),
    firstName: Joi.string().allow(''),
    lastName: Joi.string().allow(''),
    affiliation: Joi.string().allow(''),
    title: Joi.string().allow(''),
    assignations: Joi.array(),
  },
  team: {
    group: Joi.string(),
  },
}
