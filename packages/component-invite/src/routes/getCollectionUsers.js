const helpers = require('../helpers/helpers')
const teamHelper = require('../helpers/Team')

module.exports = models => async (req, res) => {
  const { role } = req.query
  if (!helpers.checkForUndefinedParams(role)) {
    res.status(400).json({ error: 'Role is required' })
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

    const membersData = members.map(async member => {
      const user = await models.User.find(member)
      const { timestamp, status } = teamHelper.getInviteData(
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
