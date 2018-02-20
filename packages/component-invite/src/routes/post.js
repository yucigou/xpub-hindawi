const logger = require('@pubsweet/logger')
const mailService = require('pubsweet-component-mail-service')
const get = require('lodash/get')
const config = require('config')
const uuid = require('uuid')
const crypto = require('crypto')
const helpers = require('../helpers/helpers')

const configRoles = config.get('roles')

module.exports = models => async (req, res) => {
  const { email, role, firstName, lastName, affiliation, title } = req.body
  if (!helpers.checkForUndefinedParams(email, role)) {
    res.status(400).json({ error: 'Email and role are required' })
    logger.error('some parameters are missing')
    return
  }

  const collectionId = get(req, 'params.collectionId')
  const reqUser = await models.User.find(req.user)
  let collection

  if (reqUser.admin && collectionId) {
    res.status(403).json({
      error: `admin cannot invite an ${role} to a collection`,
    })
    logger.error(`admin tried to invite a ${role} to a collection`)
    return
  } else if (reqUser.admin) {
    reqUser.roles = reqUser.roles || ['admin']
    const inviteRight = helpers.hasInviteRight(configRoles, reqUser.roles, role)
    if (!inviteRight.success) {
      res.status(inviteRight.status).json({
        error: inviteRight.message,
      })
      logger.error(`incorrect role when inviting a user`)
      return
    }
  } else if (collectionId) {
    if (!configRoles.collection.includes(role)) {
      res
        .status(400)
        .json({ error: `Role ${role} cannot be set on collections` })
      logger.error(`invitation has been attempted with invalid role: ${role}`)
      return
    }

    const inviteRight = helpers.hasInviteRight(configRoles, reqUser.roles, role)
    if (!inviteRight.success) {
      res.status(inviteRight.status).json({
        error: inviteRight.message,
      })
      return
    }
    try {
      collection = await models.Collection.find(collectionId)
    } catch (e) {
      const notFoundError = helpers.handleNotFoundError(e, 'collection')
      res.status(notFoundError.status).json({
        error: notFoundError.message,
      })
      return
    }
  } else {
    res.status(403).json({
      error: `${reqUser.roles ||
        'undefined roles'} cannot invite a ${role} without a collection`,
    })
    logger.error(`request user does not have any defined roles`)
    return
  }

  try {
    const user = await models.User.findByEmail(email)

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
    let newUser = new models.User(userBody)
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
      const team = new models.Team(teamBody)
      await team.save()
    }

    await mailService.setupEmail(
      newUser.email,
      emailType,
      newUser.passwordResetToken,
    )

    res.status(200).json(newUser)
  }
}
