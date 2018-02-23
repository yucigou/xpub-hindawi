const logger = require('@pubsweet/logger')
const get = require('lodash/get')
const config = require('config')
const helpers = require('../helpers/helpers')

const configRoles = config.get('roles')

module.exports = models => async (req, res) => {
  const { email, role } = req.body

  if (!helpers.checkForUndefinedParams(email, role)) {
    res.status(400).json({ error: 'Email and role are required' })
    logger.error('some parameters are missing')
    return
  }

  const reqUser = await models.User.find(req.user)
  const collectionId = get(req, 'params.collectionId')
  if (reqUser.admin) reqUser.roles = reqUser.roles || ['admin']
  const inviteRight = helpers.hasInviteRight(configRoles, reqUser.roles, role)
  if (!inviteRight.success) {
    res.status(inviteRight.status).json({
      error: inviteRight.message,
    })
    logger.error(`incorrect role when inviting a ${role}`)
    return
  }

  const url = `${req.protocol}://${req.get('host')}`
  if (collectionId) {
    return require('../controllers/assignCollectionRole')(
      email,
      role,
      reqUser,
      res,
      collectionId,
      models,
      url,
    )
  }

  if (reqUser.admin)
    return require('../controllers/inviteGlobalRole')(
      req.body,
      models.User,
      res,
      url,
    )

  res.status(403).json({
    error: `${reqUser.roles} cannot invite a ${role} without a collection`,
  })
}
