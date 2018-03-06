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
  if (!user.assignations) {
    res.status(400).json({ error: 'The user has no assignation' })
    logger.error('The request user does not have any assignation')
    return
  }
  const { collectionId } = req.params
  const filteredAssignations = user.assignations.filter(
    assignation =>
      assignation.collectionId === collectionId && assignation.type === type,
  )

  if (filteredAssignations.length === 0) {
    res.status(400).json({
      error: `Request data does not match any user assignation`,
    })
    logger.error(
      `Collection ${collectionId} and type '${type}' do not match any user assignation`,
    )
    return
  }

  const matchingAssignation = filteredAssignations[0]
  try {
    await models.Collection.find(collectionId)
    // TODO: create a team and add the team id to the user's teams array
    matchingAssignation.hasAnswer = true
    if (accept === true) {
      matchingAssignation.isAccepted = true
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
