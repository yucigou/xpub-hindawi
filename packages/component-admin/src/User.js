const bodyParser = require('body-parser')
const logger = require('@pubsweet/logger')
const uuid = require('uuid')
const crypto = require('crypto')
const mailService = require('pubsweet-component-mail-service')

const User = app => {
  app.use(bodyParser.json())
  const authBearer = app.locals.passport.authenticate('bearer', {
    session: false,
  })
  app.post('/api/admin/users', authBearer, async (req, res) => {
    const reqUser = await app.locals.models.User.find(req.user)
    if (reqUser.admin !== true) {
      res.status(403).json({ error: 'Unauthorized' })
      logger.error('unauthorized request')
      return
    }
    const { email, role } = req.body
    if (email === undefined || role === undefined) {
      res.status(400).json({ error: 'all parameters are required' })
      logger.error('some parameters are missing')
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
      if (e.name === 'NotFoundError') {
        const userBody = {
          username: uuid.v4().slice(0, 7),
          email,
          password: uuid.v4(),
          roles: { role },
          passwordResetToken: crypto.randomBytes(32).toString('hex'),
          isConfirmed: false,
        }
        let newUser = new app.locals.models.User(userBody)
        newUser = await newUser.save()
        let emailType
        switch (newUser.roles.role) {
          case 'editorInChief':
            emailType = 'invite-editor-in-chief'
            break
          case 'handlingEditor':
            emailType = 'invite-handling-editor'
            break
          case 'reviewer':
            emailType = 'invite-reviewer'
            break
          default:
            break
        }
        await mailService.setupEmail(
          newUser.email,
          emailType,
          newUser.passwordResetToken,
        )
      }
    }

    res.status(204).json()
  })
  app.post(
    '/api/admin/users/password-reset',
    bodyParser.json(),
    async (req, res) => {
      const {
        token,
        password,
        email,
        firstName,
        lastName,
        username,
        middleName,
        affiliation,
        position,
        title,
      } = req.body

      if (
        !checkForUndefinedParams(
          token,
          password,
          email,
          firstName,
          lastName,
          username,
        )
      ) {
        res.status(400).json({ error: 'missing required params' })
        return
      }

      const updateFields = {
        password,
        firstName,
        lastName,
        username,
        middleName,
        affiliation,
        position,
        title,
        isConfirmed: true,
      }

      try {
        const user = await app.locals.models.User.findByEmail(email)
        if (user) {
          if (token !== user.passwordResetToken) {
            res.status(400).json({ error: 'invalid request' })
            logger.error('admin pw reset tokens do not match')
            return
          }

          let newUser = Object.assign(user, updateFields, user)
          delete newUser.passwordResetToken

          newUser = await newUser.save()
          res.status(200).json(newUser)
        }
      } catch (e) {
        if (e.name === 'NotFoundError') {
          res.status(404).json({ error: 'user not found' })
          logger.error('admin pw reset on non-existing user')
        } else if (e.name === 'ValidationError') {
          res.status(400).json({ error: e.details[0].message })
          logger.error('admin pw reset validation error')
        }
        res.status(400).json({ error: e })
        logger.error(e)
      }
    },
  )
}

const checkForUndefinedParams = (...params) => {
  if (params.includes(undefined)) {
    return false
  }

  return true
}

module.exports = User
