const logger = require('@pubsweet/logger')
const helpers = require('../helpers/helpers')
const mailService = require('pubsweet-component-mail-service')

module.exports = async (body, UserModel, res) => {
  const { email, role, firstName, lastName, affiliation, title } = body

  try {
    const user = await UserModel.findByEmail(email)

    if (user) {
      logger.error('someone tried to invite existing user')
      return res.status(400).json({ error: 'User already exists' })
    }
  } catch (e) {
    if (e.name !== 'NotFoundError') {
      logger.error(e)
      return res.status(500).json({ error: e.details[0].message })
    }

    const newUser = await helpers.createNewUser(
      email,
      role,
      firstName,
      lastName,
      affiliation,
      title,
      UserModel,
    )

    await mailService.setupInviteEmail(
      newUser.email,
      'invite',
      newUser.passwordResetToken,
    )

    return res.status(200).json(newUser)
  }
}
