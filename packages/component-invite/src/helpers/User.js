const helpers = require('./helpers')
const mailService = require('pubsweet-component-mail-service')
const logger = require('@pubsweet/logger')

module.exports = {
  setupNewUser: async (
    body,
    url,
    res,
    email,
    role,
    UserModel,
    invitationType,
  ) => {
    const { firstName, lastName, affiliation, title } = body
    const newUser = await helpers.createNewUser(
      email,
      firstName,
      lastName,
      affiliation,
      title,
      UserModel,
      role,
    )

    try {
      await mailService.setupInviteEmail(
        newUser.email,
        invitationType,
        newUser.passwordResetToken,
        url,
      )

      return newUser
    } catch (e) {
      logger.error(e.message)
      return { status: 500, error: 'Email could not be sent.' }
    }
  },
}
