process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
process.env.SUPPRESS_NO_CONFIG_WARNING = true

const httpMocks = require('node-mocks-http')
const random = require('lodash/random')
const fixtures = require('./fixtures/fixtures')
const UserMock = require('./mocks/User')
const Chance = require('chance')

jest.mock('pubsweet-component-mail-service', () => ({ setupEmail: jest.fn() }))
const chance = new Chance()
const globalRoles = ['editorInChief', 'author', 'admin']
const manuscriptRoles = ['handlingEditor', 'reviewer']
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

const body = {
  email: chance.email(),
  role: globalRoles[random(0, globalRoles.length - 1)],
  firstName: chance.first(),
  lastName: chance.last(),
  title: 'professor',
  affiliation: 'MIT',
}
body.admin = body.role === 'admin'

const getNotFoundError = () => {
  const error = new Error()
  error.name = 'NotFoundError'
  error.status = 404

  return error
}
describe('Post invite route handler', () => {
  it('should return success when the admin invites an Editor in Chief, Author or Admin', async () => {
    const req = httpMocks.createRequest({
      body,
    })
    req.user = fixtures.users.admin
    const res = httpMocks.createResponse()
    const error = getNotFoundError()
    const models = buildModels(error, fixtures.users.admin, error)
    await require('../routes/post')(models)(req, res)

    expect(res.statusCode).toBe(200)
    const data = JSON.parse(res._getData())
    expect(data.roles[0]).toEqual(body.role)
    expect(data.firstName).toEqual(body.firstName)
    expect(data.email).toEqual(body.email)
    expect(data.admin).toEqual(body.admin)
  })
  it('should return an error when the admin invites an user on a collection', async () => {
    const req = httpMocks.createRequest({
      body,
    })
    req.user = fixtures.users.admin
    req.params.collectionId = '123'
    const res = httpMocks.createResponse()
    const error = getNotFoundError()
    const models = buildModels(error, fixtures.users.admin)
    await require('../routes/post')(models)(req, res)
    expect(res.statusCode).toBe(403)
    const data = JSON.parse(res._getData())
    expect(data.error).toEqual(
      `admin cannot invite an ${body.role} to a collection`,
    )
  })
  it('should return an error when the admin invites a manuscript role', async () => {
    body.role = manuscriptRoles[random(0, manuscriptRoles.length - 1)]
    const req = httpMocks.createRequest({
      body,
    })
    req.user = fixtures.users.admin
    const res = httpMocks.createResponse()
    const error = getNotFoundError()
    const models = buildModels(error, fixtures.users.admin)
    await require('../routes/post')(models)(req, res)
    expect(res.statusCode).toBe(403)
    const data = JSON.parse(res._getData())
    expect(data.error).toEqual(`admin cannot invite a ${body.role}`)
  })
  it('should return an error params are missing', async () => {
    delete body.email
    const req = httpMocks.createRequest({
      body,
    })
    req.user = fixtures.users.admin
    const res = httpMocks.createResponse()
    const error = getNotFoundError()
    const models = buildModels(error, fixtures.users.admin)
    await require('../routes/post')(models)(req, res)
    expect(res.statusCode).toBe(400)
    const data = JSON.parse(res._getData())
    expect(data.error).toEqual(`Email and role are required`)
  })
})
