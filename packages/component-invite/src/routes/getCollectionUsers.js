const helpers = require('../helpers/helpers')
const teamHelper = require('../helpers/Team')
const config = require('config')
const inviteHelper = require('../helpers/Invitation')

const configRoles = config.get('roles')
module.exports = models => async (req, res) => {
  const { role } = req.query
  if (!helpers.checkForUndefinedParams(role)) {
    res.status(400).json({ error: 'Role is required' })
    return
  }

  if (!configRoles.collection.includes(role)) {
    res.status(400).json({ error: `Role ${role} is invalid` })
    return
  }
  const { collectionId } = req.params

  try {
    await models.Collection.find(collectionId)
    const members = await teamHelper.getTeamMembersByCollection(
      collectionId,
      role,
      models.Team,
    )

    if (members === undefined) {
      res.status(400).json({
        error: `The requested collection does not have a ${role} Team`,
      })
      return
    }

    const membersData = members.map(async member => {
      const user = await models.User.find(member)
      if (role === 'author') {
        return user
      }
      const { timestamp, status } = inviteHelper.getInviteData(
        user.invitations,
        collectionId,
        role,
      )
      return {
        name: `${user.firstName} ${user.lastName}`,
        timestamp,
        email: user.email,
        status,
      }
    })

    const resBody = await Promise.all(membersData)
    res.status(200).json(resBody)
  } catch (e) {
    const notFoundError = await helpers.handleNotFoundError(e, 'collection')
    return res.status(notFoundError.status).json({
      error: notFoundError.message,
    })
  }
}
