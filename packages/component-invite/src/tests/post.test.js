process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
process.env.SUPPRESS_NO_CONFIG_WARNING = true

const httpMocks = require('node-mocks-http')
const random = require('lodash/random')
const fixtures = require('./fixtures/fixtures')
const UserMock = require('./mocks/User')

const roles = ['editorInChief', 'author', 'admin']
const buildModels = (collection, findUser, emailUser) => {
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
  }

  UserMock.find = jest.fn(
    () =>
      findUser instanceof Error
        ? Promise.reject(findUser)
        : Promise.resolve(findUser),
  )
  UserMock.findByEmail = jest.fn(
    () =>
      emailUser instanceof Error
        ? Promise.reject(emailUser)
        : Promise.resolve(emailUser),
  )

  models.User = UserMock
  return models
}

describe('Post invite route handler', () => {
  it('should return success when the admin invites an Editor in Chief, Author or Admin', async () => {
    const body = {
      email: 'sebi.mihalache@gmail.com',
      role: roles[random(0, roles.length - 1)],
      firstName: 'john',
      lastName: 'smith',
      title: 'professor',
      affiliation: 'MIT',
    }
    const req = httpMocks.createRequest({
      body,
    })
    req.user = fixtures.users.admin
    const res = httpMocks.createResponse()
    const error = new Error()
    error.name = 'NotFoundError'
    error.status = 404
    const models = buildModels(error, fixtures.users.admin, error)
    await require('../routes/post')(models)(req, res)
    expect(res.statusCode).toBe(200)
    const data = JSON.parse(res._getData())
  })
})
