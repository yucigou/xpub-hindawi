const logger = require('@pubsweet/logger')
const helpers = require('../helpers/helpers')

module.exports = models => async (req, res) => {
  const { type, accept } = req.body

  if (!helpers.checkForUndefinedParams(type, accept)) {
    res.status(400).json({ error: 'Type and accept are required' })
    logger.error('some parameters are missing')
    return
  }

  const user = await models.User.find(req.user)
  if (!user.assignation) {
    res.status(400).json({ error: 'The user has no assignation' })
    logger.error('The request user does not have any assignation')
    return
  }
  const { collectionId } = req.params
  if (collectionId !== user.assignation.collectionId) {
    res.status(400).json({
      error: 'User collection and provided collection do not match',
    })
    logger.error(
      `Param ${collectionId} does not match user collection: ${
        user.assignation.collectionId
      }`,
    )
    return
  }

  if (type !== user.assignation.type) {
    res.status(400).json({
      error: 'User assignation type and provided type do not match',
    })
    logger.error(
      `Param ${type} does not match user assignation type: ${
        user.assignation.type
      }`,
    )
    return
  }

  try {
    await models.Collection.find(collectionId)
    // TODO: create a team and add the team id to the user's teams array
    user.assignation.hasAnswer = true
    if (accept) {
      user.assignation.isAccepted = true
    }
    await user.save()
    res.status(204).json()
    return
  } catch (e) {
    const notFoundError = await helpers.handleNotFoundError(e, 'collection')
    return res.status(notFoundError.status).json({
      error: notFoundError.message,
    })
  }
}
