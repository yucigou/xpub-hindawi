const logger = require('@pubsweet/logger')
const uuid = require('uuid')
const crypto = require('crypto')

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
    logger.error('internal server error')
    return {
      success: false,
      status: 500,
      message: e.details[0].message,
    }
  }
  return {
    success: false,
    status: 500,
    message: 'something went wrong',
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

const createNewUser = async (
  email,
  firstName,
  lastName,
  affiliation,
  title,
  UserModel,
  role,
) => {
  const userBody = {
    username: uuid.v4().slice(0, 8),
    email,
    password: uuid.v4(),
    passwordResetToken: crypto.randomBytes(32).toString('hex'),
    isConfirmed: false,
    firstName,
    lastName,
    affiliation,
    title,
    editorInChief: role === 'editorInChief',
    admin: role === 'admin',
  }
  let newUser = new UserModel(userBody)
  try {
    newUser = await newUser.save()
    return newUser
  } catch (e) {
    logger.error(e)
  }
}

module.exports = {
  checkForUndefinedParams,
  validateEmailAndToken,
  handleNotFoundError,
  createNewUser,
}
