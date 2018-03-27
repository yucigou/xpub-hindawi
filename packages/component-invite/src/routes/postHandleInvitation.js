const logger = require('@pubsweet/logger')
const helpers = require('../helpers/helpers')
const teamHelper = require('../helpers/Team')
const mailService = require('pubsweet-component-mail-service')
const collectionHelper = require('../helpers/Collection')

module.exports = models => async (req, res) => {
  const { type, accept } = req.body

  if (!helpers.checkForUndefinedParams(type, accept)) {
    res.status(400).json({ error: 'Type and accept are required' })
    logger.error('some parameters are missing')
    return
  }

  let user = await models.User.find(req.user)
  if (!user.invitations) {
    res.status(400).json({ error: 'The user has no invitation' })
    logger.error('The request user does not have any invitation')
    return
  }
  const { collectionId } = req.params

  try {
    const collection = await models.Collection.find(collectionId)
    const matchingInvitations = user.invitations.filter(
      invitation =>
        invitation.collectionId === collectionId && invitation.type === type,
    )

    if (matchingInvitations.length === 0) {
      res.status(400).json({
        error: `Request data does not match any user invitation`,
      })
      logger.error(
        `Collection ${collectionId} and type '${type}' do not match any user invitation`,
      )
      return
    }

    const matchingInvitation = matchingInvitations[0]
    matchingInvitation.hasAnswer = true
    if (accept === true) {
      matchingInvitation.isAccepted = true
      await collectionHelper.updateAssignedPeople(collection, user.email)
      try {
        const users = await models.User.all()

        const eic = users.find(user => user.editorInChief === true)
        await mailService.setupHandlingEditorAgreedEmail(
          eic.email,
          user,
          'handling-editor-agreed',
          `${req.protocol}://${req.get('host')}`,
          collection.customId,
        )
      } catch (e) {
        logger.error(e)
        return res.status(500).json({ error: 'Mail could not be sent.' })
      }
    } else {
      matchingInvitation.isAccepted = false
      await teamHelper.removeTeamMember(
        matchingInvitation.teamId,
        user.id,
        models.Team,
      )
      user.teams = user.teams.filter(
        userTeamId => matchingInvitation.teamId !== userTeamId,
      )
      await collectionHelper.removeAssignedPeople(collection, user.email)
      const { reason } = req.body
      if (reason !== undefined) {
        matchingInvitation.reason = reason
      }
    }
    user = await user.save()
    res.status(200).json(user)
    return
  } catch (e) {
    const notFoundError = await helpers.handleNotFoundError(e, 'collection')
    return res.status(notFoundError.status).json({
      error: notFoundError.message,
    })
  }
}
