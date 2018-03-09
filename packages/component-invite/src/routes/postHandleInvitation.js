const logger = require('@pubsweet/logger')
const helpers = require('../helpers/helpers')
const teamHelper = require('../helpers/Team')

module.exports = models => async (req, res) => {
  const { type, accept } = req.body

  if (!helpers.checkForUndefinedParams(type, accept)) {
    res.status(400).json({ error: 'Type and accept are required' })
    logger.error('some parameters are missing')
    return
  }

  const user = await models.User.find(req.user)
  if (!user.invitations) {
    res.status(400).json({ error: 'The user has no invitation' })
    logger.error('The request user does not have any invitation')
    return
  }
  const { collectionId } = req.params
  // console.log('UI', user.invitations)
  const filteredInvitations = user.invitations.filter(
    invitation =>
      invitation.collectionId === collectionId && invitation.type === type,
  )

  if (filteredInvitations.length === 0) {
    res.status(400).json({
      error: `Request data does not match any user invitation`,
    })
    logger.error(
      `Collection ${collectionId} and type '${type}' do not match any user invitation`,
    )
    return
  }

  const matchingInvitation = filteredInvitations[0]
  try {
    await models.Collection.find(collectionId)
    matchingInvitation.hasAnswer = true
    if (accept === true) {
      matchingInvitation.isAccepted = true
      await user.save()
    } else {
      await teamHelper.removeTeamMember(
        matchingInvitation.teamId,
        user.id,
        models.Team,
      )
    }

    res.status(204).json()
    return
  } catch (e) {
    const notFoundError = await helpers.handleNotFoundError(e, 'collection')
    return res.status(notFoundError.status).json({
      error: notFoundError.message,
    })
  }
}
