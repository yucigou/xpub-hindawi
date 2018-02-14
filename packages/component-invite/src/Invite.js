const bodyParser = require('body-parser')
const logger = require('@pubsweet/logger')
const uuid = require('uuid')
const crypto = require('crypto')
const mailService = require('pubsweet-component-mail-service')
const get = require('lodash/get')

const Invite = app => {
  app.use(bodyParser.json())
  const authBearer = app.locals.passport.authenticate('bearer', {
    session: false,
  })
  app.post('/api/users/invite/:collectionId?', authBearer, async (req, res) => {
    const { email, role } = req.body
    if (!checkForUndefinedParams(email, role)) {
      res.status(400).json({ error: 'Email and role are required' })
      logger.error('some parameters are missing')
      return
    }

    const collectionId = get(req, 'params.collectionId')
    const reqUser = await app.locals.models.User.find(req.user)
    let collection
    if (collectionId) {
      try {
        if (role !== 'reviewer' && role !== 'handlingEditor') {
          res.status(400).json({ error: 'Role does not exist for collections' })
          logger.error(
            `invitation has been attempted with invalid role: ${role}`,
          )
          return
        }
        if (reqUser.roles === undefined) {
          res
            .status(403)
            .json({ error: 'Only HE or EiC can invite users to collection' })
          logger.error(`request user does not have any defined roles`)
          return
        }
        if (role === 'reviewer' && !reqUser.roles.includes('handlingEditor')) {
          res.status(403).json({ error: 'Only HE can invite reviewers' })
          logger.error(`incorrect role when inviting a reviewer`)
          return
        } else if (
          role === 'handlingEditor' &&
          !reqUser.roles.includes('editorInChief')
        ) {
          res.status(403).json({ error: 'Only EiC can invite HE' })
          logger.error(`incorrect role when inviting a handling editor`)
          return
        }
        collection = await app.locals.models.Collection.find(collectionId)
      } catch (e) {
        if (e.name === 'NotFoundError') {
          res.status(404).json({ error: 'Collection not found' })
          logger.error(`invalid collection id when inviting ${role}`)
          return
        }

        res.status(500).json({ error: 'Something went wrong' })
        logger.error(e)
        return
      }
    } else if (role !== 'editorInChief') {
      res.status(400).json({ error: 'Collection id is required' })
      logger.error('missing collection id when trying to invite reviewer/HE')
      return
    } else if (reqUser.admin !== true) {
      res.status(403).json({ error: 'Only an admin can invite EiC' })
      logger.error('non-admin user tried to invite an EiC')
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
        res.status(500).json({ error: e })
        logger.error(e)
        return
      }

      const userBody = {
        username: uuid.v4().slice(0, 7),
        email,
        password: uuid.v4(),
        roles: [role],
        passwordResetToken: crypto.randomBytes(32).toString('hex'),
        isConfirmed: false,
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
  app.post(
    '/api/users/invite/password/reset',
    bodyParser.json(),
    async (req, res) => {
      const {
        token,
        password,
        email,
        firstName,
        lastName,
        middleName,
        affiliation,
        position,
        title,
      } = req.body

      if (
        !checkForUndefinedParams(token, password, email, firstName, lastName)
      ) {
        res.status(400).json({ error: 'missing required params' })
        return
      }

      const updateFields = {
        password,
        firstName,
        lastName,
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
            logger.error(
              `invite pw reset tokens do not match: REQ ${token} vs. DB ${
                user.passwordResetToken
              }`,
            )
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
          logger.error('invite pw reset on non-existing user')
        } else if (e.name === 'ValidationError') {
          res.status(400).json({ error: e.details[0].message })
          logger.error('invite pw reset validation error')
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

module.exports = Invite
