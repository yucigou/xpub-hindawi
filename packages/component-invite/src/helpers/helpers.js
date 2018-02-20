const logger = require('@pubsweet/logger')

const checkForUndefinedParams = (...params) => {
  if (params.includes(undefined)) {
    return false
  }

  return true
}

const validateEmailAndToken = async (email, token, userModel) => {
  try {
    const user = await userModel.findByEmail(email)
    if (user) {
      if (token !== user.passwordResetToken) {
        logger.error(
          `invite pw reset tokens do not match: REQ ${token} vs. DB ${
            user.passwordResetToken
          }`,
        )
        return {
          success: false,
          status: 400,
          message: 'invalid request',
        }
      }
      return { success: true, user }
    }
  } catch (e) {
    if (e.name === 'NotFoundError') {
      logger.error('invite pw reset on non-existing user')
      return {
        success: false,
        status: 404,
        message: 'user not found',
      }
    } else if (e.name === 'ValidationError') {
      logger.error('invite pw reset validation error')
      return {
        success: false,
        status: 400,
        message: e.details[0].message,
      }
    }
    logger.error(e)
    return {
      success: false,
      status: 500,
      message: e.details[0].message,
    }
  }
}

const hasInviteRight = (configRoles, userRoles, role) => {
  const includesRole = existingRole =>
    configRoles.inviteRights[existingRole].includes(role)
  if (!userRoles.some(includesRole)) {
    logger.error(`incorrect role when inviting a user`)

    return {
      success: false,
      status: 403,
      message: `${userRoles} cannot invite a ${role}`,
    }
  }

  return {
    success: true,
  }
}

const handleNotFoundError = async (error, item) => {
  const response = {
    success: false,
    status: 500,
    message: 'Something went wrong',
  }
  if (error.name === 'NotFoundError') {
    logger.error(`invalid ${item} id`)
    response.status = 404
    response.message = `${item} not found`
    return response
  }

  logger.error(error)
  return response
}

module.exports = {
  checkForUndefinedParams,
  validateEmailAndToken,
  hasInviteRight,
  handleNotFoundError,
}
