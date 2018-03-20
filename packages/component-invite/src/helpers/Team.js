const logger = require('@pubsweet/logger')
const config = require('config')
const get = require('lodash/get')

const configRoles = config.get('roles')

const createNewTeam = async (collectionId, role, userId, TeamModel) => {
  let permissions, group, name
  switch (role) {
    case 'handlingEditor':
      permissions = 'handlingEditor'
      group = 'handlingEditor'
      name = 'Handling Editor'
      break
    case 'reviewer':
      permissions = 'reviewer'
      group = 'reviewer'
      name = 'Reviewer'
      break
    default:
      break
  }

  const teamBody = {
    teamType: {
      name: role,
      permissions,
    },
    group,
    name,
    object: {
      type: 'collection',
      id: collectionId,
    },
    members: [userId],
  }
  let team = new TeamModel(teamBody)
  team = await team.save()
  return team
}

const setupEiCTeams = async (models, user) => {
  const collections = await models.Collection.all()
  const teams = await models.Team.all()
  user.teams = []
  const collectionIDs = []
  /* eslint-disable */
  for (const collection of collections) {
    for (let team of teams) {
      if (
        team.group === 'editorInChief' &&
        team.object.type === 'collection' &&
        team.object.id === collection.id
      ) {
        collectionIDs.push(collection.id)
        team.members.push(user.id)
        try {
          team = await team.updateProperties(team)
          team = await team.save()
        } catch (e) {
          logger.error(e)
        }
      }
    }

    if (!collectionIDs.includes(collection.id)) {
      await createNewTeam(collection.id, 'editorInChief', user.id, models.Team)
    }
  }
  /* eslint-enable */
  user = await models.User.find(user.id)
  return user
}

const setupManuscriptTeam = async (models, user, collectionId, role) => {
  const teams = await models.Team.all()
  user.teams = []
  const filteredTeams = teams.filter(
    team =>
      team.group === role &&
      team.object.type === 'collection' &&
      team.object.id === collectionId,
  )

  if (filteredTeams.length > 0) {
    let team = filteredTeams[0]
    team.members.push(user.id)

    try {
      team = await team.updateProperties(team)
      team = await team.save()
      return team
    } catch (e) {
      logger.error(e)
    }
  } else {
    const team = await createNewTeam(collectionId, role, user.id, models.Team)
    return team
  }
}

const getMatchingTeams = (teams, TeamModel, collectionId, role) =>
  teams
    .map(async teamId => {
      const team = await TeamModel.find(teamId)
      if (
        team.object.id === collectionId &&
        configRoles.inviteRights[team.group].includes(role)
      ) {
        return team
      }
      return null
    })
    .filter(Boolean)

const removeTeamMember = async (teamId, userId, TeamModel) => {
  const team = await TeamModel.find(teamId)
  const members = team.members.filter(member => member !== userId)
  team.members = members
  await TeamModel.updateProperties(team)

  await team.save()
}

const getTeamMembersByCollection = async (collectionId, role, TeamModel) => {
  const teams = await TeamModel.all()
  const members = get(
    teams.find(
      team =>
        team.group === role &&
        team.object.type === 'collection' &&
        team.object.id === collectionId,
    ),
    'members',
  )

  return members
}

const getTeamByGroupAndCollection = async (collectionId, role, TeamModel) => {
  const teams = await TeamModel.all()
  return teams.find(
    team =>
      team.group === role &&
      team.object.type === 'collection' &&
      team.object.id === collectionId,
  )
}

module.exports = {
  createNewTeam,
  setupEiCTeams,
  setupManuscriptTeam,
  getMatchingTeams,
  removeTeamMember,
  getTeamMembersByCollection,
  getTeamByGroupAndCollection,
}
