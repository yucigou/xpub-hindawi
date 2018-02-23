const logger = require('@pubsweet/logger')
const config = require('config')
const helpers = require('../helpers/helpers')
const mailService = require('pubsweet-component-mail-service')

const configRoles = config.get('roles')

module.exports = async (
  email,
  role,
  reqUser,
  res,
  collectionId,
  models,
  url,
) => {
  if (reqUser.admin) {
    logger.error(`admin tried to invite a ${role} to a collection`)

    return res.status(403).json({
      error: `admin cannot invite an ${role} to a collection`,
    })
  }

  if (!configRoles.collection.includes(role)) {
    logger.error(`invitation has been attempted with invalid role: ${role}`)
    return res
      .status(403)
      .json({ error: `Role ${role} cannot be set on collections` })
  }

  try {
    await models.Collection.find(collectionId)
  } catch (e) {
    const notFoundError = await helpers.handleNotFoundError(e, 'collection')
    return res.status(notFoundError.status).json({
      error: notFoundError.message,
    })
  }

  try {
    let user = await models.User.findByEmail(email)
    user.roles.push(role)
    const assignation = {
      type: role,
      hasAnswer: false,
      isAccepted: false,
      collectionId,
    }
    user.assignation = assignation
    user = await user.save()
    await mailService.setupAssignEmail(
      user.email,
      'assign-handling-editor',
      url,
    )

    // TODO: create a team and add the team id to the user's teams array

    return res.status(200).json(user)
  } catch (e) {
    const notFoundError = await helpers.handleNotFoundError(e, 'user')
    return res.status(notFoundError.status).json({
      error: notFoundError.message,
    })
  }
}
