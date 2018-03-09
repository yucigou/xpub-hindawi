const logger = require('@pubsweet/logger')
const get = require('lodash/get')
const helpers = require('../helpers/helpers')

module.exports = models => async (req, res) => {
  const { email, role } = req.body

  if (!helpers.checkForUndefinedParams(email, role)) {
    res.status(400).json({ error: 'Email and role are required' })
    logger.error('some parameters are missing')
    return
  }

  const reqUser = await models.User.find(req.user)
  const collectionId = get(req, 'params.collectionId')

  const url = `${req.protocol}://${req.get('host')}`
  if (collectionId) {
    return require('../controllers/assignCollectionRole')(
      email,
      role,
      req.user,
      res,
      collectionId,
      models,
      url,
    )
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
