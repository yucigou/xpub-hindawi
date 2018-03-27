const fixtures = require('../fixtures/fixtures')

const UserMock = require('../mocks/User')
const TeamMock = require('../mocks/Team')

const notFoundError = new Error()
notFoundError.name = 'NotFoundError'
notFoundError.status = 404

const build = () => {
  const models = {
    User: {},
    Collection: {
      find: jest.fn(id => findMock(id, 'collections')),
    },
    Team: {},
  }
  UserMock.find = jest.fn(id => findMock(id, 'users'))
  UserMock.findByEmail = jest.fn(email => findByEmailMock(email))
  UserMock.all = jest.fn(() => Object.values(fixtures.users))
  TeamMock.find = jest.fn(id => findMock(id, 'teams'))
  TeamMock.updateProperties = jest.fn(team =>
    updatePropertiesMock(team, 'teams'),
  )
  TeamMock.all = jest.fn(() => Object.values(fixtures.teams))

  models.User = UserMock
  models.Team = TeamMock
  return models
}

const findMock = (id, type) => {
  const foundObj = Object.values(fixtures[type]).find(
    fixtureObj => fixtureObj.id === id,
  )

  if (foundObj === undefined) return Promise.reject(notFoundError)
  return Promise.resolve(foundObj)
}

const findByEmailMock = email => {
  const foundUser = Object.values(fixtures.users).find(
    fixtureUser => fixtureUser.email === email,
  )

  if (foundUser === undefined) return Promise.reject(notFoundError)
  return Promise.resolve(foundUser)
}

const updatePropertiesMock = (obj, type) => {
  const foundObj = Object.values(fixtures[type]).find(
    fixtureObj => fixtureObj === obj,
  )

  if (foundObj === undefined) return Promise.reject(notFoundError)
  return Promise.resolve(foundObj)
}
module.exports = { build }
