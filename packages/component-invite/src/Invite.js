const bodyParser = require('body-parser')
const logger = require('@pubsweet/logger')
const uuid = require('uuid')
const crypto = require('crypto')
const mailService = require('pubsweet-component-mail-service')
const get = require('lodash/get')
const pick = require('lodash/pick')
const config = require('config')

const configRoles = config.get('roles')
const Invite = app => {
  app.use(bodyParser.json())
  const authBearer = app.locals.passport.authenticate('bearer', {
    session: false,
  })
  app.post('/api/users/invite/:collectionId?', authBearer, async (req, res) => {
    const { email, role, firstName, lastName, affiliation, title } = req.body
    if (!checkForUndefinedParams(email, role)) {
      res.status(400).json({ error: 'Email and role are required' })
      logger.error('some parameters are missing')
      return
    }

    const hasInviteRight = existingRole =>
      configRoles.inviteRights[existingRole].includes(role)
    const collectionId = get(req, 'params.collectionId')
    const reqUser = await app.locals.models.User.find(req.user)
    let collection
    if (collectionId && reqUser.roles !== undefined) {
      if (!configRoles.collection.includes(role)) {
        res
          .status(400)
          .json({ error: `Role ${role} cannot be set on collections` })
        logger.error(`invitation has been attempted with invalid role: ${role}`)
        return
      }

      if (!reqUser.roles.some(hasInviteRight)) {
        res.status(403).json({
          error: `${reqUser.roles} cannot invite a ${role}`,
        })
        logger.error(`incorrect role when inviting a user`)
        return
      }
      try {
        collection = await app.locals.models.Collection.find(collectionId)
      } catch (e) {
        if (e.name === 'NotFoundError') {
          res.status(404).json({ error: 'Collection not found' })
          logger.error(`invalid collection id when inviting a ${role}`)
          return
        }

        res.status(500).json({ error: 'Something went wrong' })
        logger.error(e)
        return
      }
    } else if (reqUser.admin === true) {
      reqUser.roles = []
      reqUser.roles.push('admin') // this should be moved in pubsweet server
    } else {
      res.status(403).json({
        error: `${reqUser.roles ||
          'undefined roles'} cannot invite a ${role} without a collection`,
      })
      logger.error(`request user does not have any defined roles`)
      return
    }

    if (!reqUser.roles.some(hasInviteRight)) {
      res.status(403).json({
        error: `${reqUser.roles} cannot invite a ${role}`,
      })
      logger.error(`incorrect role when inviting a ${role}`)
      return
    }

    try {
      const user = await app.locals.models.User.findByEmail(email)

      if (user) {
        res.status(400).json({ error: 'User already exists' })
        logger.error('admin tried to invite existing user')
        return
      }
    } catch (e) {
      if (e.name !== 'NotFoundError') {
        res.status(500).json({ error: e.details[0].message })
        logger.error(e)
        return
      }

      const userBody = {
        username: uuid.v4().slice(0, 8),
        email,
        password: uuid.v4(),
        roles: [role],
        passwordResetToken: crypto.randomBytes(32).toString('hex'),
        isConfirmed: false,
        firstName,
        lastName,
        affiliation,
        title,
        admin: role === 'admin',
      }
      let newUser = new app.locals.models.User(userBody)
      newUser = await newUser.save()

      let emailType = 'invite-editor-in-chief'
      if (collection) {
        let permissions, group, name
        switch (newUser.roles[0]) {
          case 'handlingEditor':
            emailType = 'invite-handling-editor'
            permissions = 'editor'
            group = 'editor'
            name = 'Handling Editor'
            break
          case 'reviewer':
            emailType = 'invite-reviewer'
            permissions = 'reviewer'
            group = 'reviewer'
            name = 'Reviewer'
            break
          default:
            break
        }

        const teamBody = {
          teamType: {
            name: newUser.roles[0],
            permissions,
          },
          group,
          name,
          object: {
            type: 'collection',
            id: collection.id,
          },
          members: [newUser.id],
        }
        const team = new app.locals.models.Team(teamBody)
        await team.save()
      }

      await mailService.setupEmail(
        newUser.email,
        emailType,
        newUser.passwordResetToken,
      )

      res.status(200).json(newUser)
    }
  })
  app.get('/api/users/invite', async (req, res) => {
    const { email, token } = req.query
    if (!checkForUndefinedParams(email, token)) {
      res.status(400).json({ error: 'missing required params' })
      return
    }

    const validateResponse = await validateEmailAndToken(
      email,
      token,
      app.locals.models.User,
    )
    if (validateResponse.success === false) {
      res
        .status(validateResponse.status)
        .json({ error: validateResponse.message })
      return
    }

    const resBody = pick(validateResponse.user, [
      'firstName',
      'lastName',
      'affiliation',
      'title',
    ])

    res.status(200).json(resBody)
  })
  app.post(
    '/api/users/invite/password/reset',
    bodyParser.json(),
    async (req, res) => {
      if (!checkForUndefinedParams(req.body)) {
        res.status(400).json({ error: 'missing required params' })
        return
      }

      const { password } = req.body
      if (password.length < 7) {
        res
          .status(400)
          .json({ error: 'password needs to be at least 7 characters long' })
        logger.error(
          `the user added an invalid password length: ${password.length}`,
        )
        return
      }

      const updateFields = {
        password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        affiliation: req.body.affiliation,
        title: req.body.title,
        isConfirmed: true,
      }

      const validateResponse = await validateEmailAndToken(
        req.body.email,
        req.body.token,
        app.locals.models.User,
      )
      if (validateResponse.success === false) {
        res
          .status(validateResponse.status)
          .json({ error: validateResponse.message })
        return
      }

      if (validateResponse.user.isConfirmed) {
        res.status(400).json({ error: 'User is already confirmed' })
        return
      }

      let newUser = Object.assign(
        validateResponse.user,
        updateFields,
        validateResponse.user,
      )
      delete newUser.passwordResetToken

      newUser = await newUser.save()
      res.status(200).json(newUser)
    },
  )
}

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

module.exports = Invite
