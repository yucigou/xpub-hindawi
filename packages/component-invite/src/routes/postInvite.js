const logger = require('@pubsweet/logger')
const get = require('lodash/get')
const helpers = require('../helpers/helpers')
const config = require('config')
const concat = require('lodash/concat')

const configRoles = config.get('roles')

module.exports = models => async (req, res) => {
  const { email, role } = req.body

  if (!helpers.checkForUndefinedParams(email, role)) {
    res.status(400).json({ error: 'Email and role are required' })
    logger.error('some parameters are missing')
    return
  }

  const validRolesList = concat(configRoles.global, configRoles.collection)
  if (!validRolesList.includes(role)) {
    res.status(400).json({ error: `Role ${role} is invalid` })
    logger.error(`invitation attempted on invalid role ${role}`)
    return
  }
  const reqUser = await models.User.find(req.user)

  const collectionId = get(req, 'params.collectionId')
  const url = `${req.protocol}://${req.get('host')}`
  if (collectionId)
    return require('../controllers/assignCollectionRole')(
      email,
      role,
      reqUser,
      res,
      collectionId,
      models,
      url,
      req.body,
    )

  if (email === reqUser.email) {
    res.status(400).json({ error: 'Cannot invite yourself' })
    logger.error(`${reqUser.email} tried to invite his own email`)
    return
  }
  if (reqUser.admin)
    return require('../controllers/inviteGlobalRole')(
      req.body,
      models,
      res,
      url,
    )

  res.status(403).json({
    error: `${reqUser.username} cannot invite a ${role} without a collection`,
  })
}
