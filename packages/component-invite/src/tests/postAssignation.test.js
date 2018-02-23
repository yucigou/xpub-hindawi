process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
process.env.SUPPRESS_NO_CONFIG_WARNING = true

const httpMocks = require('node-mocks-http')
const fixtures = require('./fixtures/fixtures')
const UserMock = require('./mocks/User')

jest.mock('pubsweet-component-mail-service', () => ({
  setupAssignEmail: jest.fn(),
}))

const buildModels = (collection, user) => {
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
      user instanceof Error ? Promise.reject(user) : Promise.resolve(user),
  )
  models.User = UserMock
  return models
}

const notFoundError = new Error()
notFoundError.name = 'NotFoundError'
notFoundError.status = 404

const { handlingEditor } = fixtures.users
const { standardCollection } = fixtures.collections
const postAssignationPath = '../routes/postAssignation'
describe('Post assignation route handler', () => {
  it('should return success when the handling editor accepts work on a collection', async () => {
    const body = {
      type: 'handlingEditor',
      accept: true,
    }
    const req = httpMocks.createRequest({
      body,
    })
    req.user = handlingEditor
    const res = httpMocks.createResponse()
    const models = buildModels(standardCollection, handlingEditor)
    await require(postAssignationPath)(models)(req, res)

    expect(res.statusCode).toBe(204)
    expect(handlingEditor.assignation.hasAnswer).toBeTruthy()
    expect(handlingEditor.assignation.isAccepted).toBeTruthy()
  })
})
