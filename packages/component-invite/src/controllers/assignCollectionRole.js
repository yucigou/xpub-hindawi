const logger = require('@pubsweet/logger')
const config = require('config')
const helpers = require('../helpers/helpers')
const teamHelper = require('../helpers/Team')
const mailService = require('pubsweet-component-mail-service')
const inviteHelper = require('../helpers/Invitation')
const collHelper = require('../helpers/Collection')

const configRoles = config.get('roles')

module.exports = async (
  email,
  role,
  reqUser,
  res,
  collectionId,
  models,
  url,
  resend,
) => {
  if (!configRoles.collection.includes(role)) {
    logger.error(`invitation has been attempted with invalid role: ${role}`)
    return res
      .status(403)
      .json({ error: `Role ${role} cannot be set on collections` })
  }

  if (!reqUser.editorInChief && reqUser.teams === undefined && !reqUser.admin) {
    return res
      .status(403)
      .json({ error: `User ${reqUser.username} is not part of any teams` })
  } else if (reqUser.editorInChief === false && reqUser.admin === false) {
    const matchingTeams = await teamHelper.getMatchingTeams(
      reqUser.teams,
      models.Team,
      collectionId,
      role,
    )

    if (matchingTeams.length === 0) {
      return res.status(403).json({
        error: `User ${
          reqUser.email
        } cannot invite a ${role} to ${collectionId}`,
      })
    }
  }

  let collection
  try {
    collection = await models.Collection.find(collectionId)
  } catch (e) {
    const notFoundError = await helpers.handleNotFoundError(e, 'collection')
    return res.status(notFoundError.status).json({
      error: notFoundError.message,
    })
  }

  try {
    let user = await models.User.findByEmail(email)

    const team = await teamHelper.setupManuscriptTeam(
      models,
      user,
      collectionId,
      role,
    )
    user = await models.User.findByEmail(email)

    if (user.invitations === undefined) {
      user = await inviteHelper.setupInvitation(
        user,
        role,
        collectionId,
        team.id,
      )
      await collHelper.addAssignedPeople(collection, user, role)
    } else {
      const matchingInvitation = inviteHelper.getMatchingInvitation(
        user.invitations,
        collectionId,
        role,
      )
      if (matchingInvitation === undefined) {
        user = await inviteHelper.setupInvitation(
          user,
          role,
          collectionId,
          team.id,
        )
        await collHelper.addAssignedPeople(collection, user, role)
      }
    }

    try {
      await mailService.setupAssignEmail(
        user.email,
        'assign-handling-editor',
        url,
      )

      return res.status(200).json(user)
    } catch (e) {
      logger.error(e)
      return res.status(500).json({ error: 'Mail could not be sent.' })
    }
  } catch (e) {
    const notFoundError = await helpers.handleNotFoundError(e, 'user')
    return res.status(notFoundError.status).json({
      error: notFoundError.message,
    })
  }
}
