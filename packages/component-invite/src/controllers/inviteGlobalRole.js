const logger = require('@pubsweet/logger')
const userHelper = require('../helpers/User')
const config = require('config')

const configRoles = config.get('roles')

module.exports = async (body, models, res, url) => {
  const { email, role } = body

  if (!configRoles.inviteRights.admin.includes(role)) {
    logger.error(`admin ${email} tried to invite a ${role}`)
    return res
      .status(403)
      .json({ error: `admin tried to invite an invalid role: ${role}` })
  }

  try {
    const user = await models.User.findByEmail(email)
    if (user) {
      logger.error(`admin tried to invite existing user: ${email}`)
      return res.status(400).json({ error: 'User already exists' })
    }
  } catch (e) {
    if (e.name !== 'NotFoundError') {
      logger.error(e)
      return res.status(500).json({ error: e.details[0].message })
    }

    return userHelper.setupNewUser(
      body,
      url,
      res,
      email,
      role,
      models.User,
      'invite',
    )
  }
}
