const fixtures = require('../fixtures/fixtures')

const UserMock = require('../mocks/User')
const TeamMock = require('../mocks/Team')

const build = (collection, findUser, emailUser, team) => {
  const models = {
    User: {},
    Collection: {
      find: jest.fn(
        () =>
          collection instanceof Error
            ? Promise.reject(collection)
            : Promise.resolve(collection),
      ),
    },
    Team: {},
  }
  UserMock.find = jest.fn(user => {
    const foundUser = Object.values(fixtures.users).find(
      fixUser => fixUser.id === user.id,
    )

    if (foundUser === undefined) {
      return Promise.reject(findUser)
    }

    return Promise.resolve(findUser)
  })

  UserMock.findByEmail = jest.fn(
    () =>
      emailUser instanceof Error
        ? Promise.reject(emailUser)
        : Promise.resolve(emailUser),
  )

  TeamMock.find = jest.fn(
    () =>
      team instanceof Error ? Promise.reject(team) : Promise.resolve(team),
  )
  TeamMock.updateProperties = jest.fn(
    () =>
      team instanceof Error ? Promise.reject(team) : Promise.resolve(team),
  )
  TeamMock.all = jest.fn(() => Object.values(fixtures.teams))

  models.User = UserMock
  models.Team = TeamMock
  return models
}

module.exports = { build }
