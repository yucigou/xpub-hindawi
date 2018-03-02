process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
process.env.SUPPRESS_NO_CONFIG_WARNING = true

const httpMocks = require('node-mocks-http')
const fixtures = require('./fixtures/fixtures')
const UserMock = require('./mocks/User')
const cloneDeep = require('lodash/cloneDeep')

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
    const acceptingHE = cloneDeep(handlingEditor)
    const body = {
      type: 'handlingEditor',
      accept: true,
    }
    const req = httpMocks.createRequest({
      body,
    })
    req.user = acceptingHE
    req.params.collectionId = standardCollection.id
    const res = httpMocks.createResponse()
    const models = buildModels(standardCollection, acceptingHE)
    await require(postAssignationPath)(models)(req, res)

    expect(res.statusCode).toBe(204)
    expect(acceptingHE.assignations[0].hasAnswer).toBeTruthy()
    expect(acceptingHE.assignations[0].isAccepted).toBeTruthy()
  })
  it('should return success when the handling editor refuses work on a collection', async () => {
    const refusingHE = cloneDeep(handlingEditor)
    const body = {
      type: 'handlingEditor',
      accept: false,
    }
    const req = httpMocks.createRequest({
      body,
    })
    req.user = refusingHE
    req.params.collectionId = standardCollection.id
    const res = httpMocks.createResponse()
    const models = buildModels(standardCollection, refusingHE)
    await require(postAssignationPath)(models)(req, res)

    expect(res.statusCode).toBe(204)
    expect(refusingHE.assignations[0].hasAnswer).toBeTruthy()
    expect(refusingHE.assignations[0].isAccepted).toBeFalsy()
  })
  it('should return an error params are missing', async () => {
    const body = {
      type: 'handlingEditor',
    }
    const req = httpMocks.createRequest({
      body,
    })
    req.user = handlingEditor
    req.params.collectionId = standardCollection.id
    const res = httpMocks.createResponse()
    const models = buildModels(standardCollection, handlingEditor)
    await require(postAssignationPath)(models)(req, res)

    expect(res.statusCode).toBe(400)
    const data = JSON.parse(res._getData())
    expect(data.error).toEqual('Type and accept are required')
  })
  it('should return an error if the collection id does not exists', async () => {
    const body = {
      type: 'handlingEditor',
      accept: false,
    }
    const req = httpMocks.createRequest({
      body,
    })
    req.user = handlingEditor
    req.params.collectionId = standardCollection.id
    const res = httpMocks.createResponse()
    const models = buildModels(notFoundError, handlingEditor)
    await require(postAssignationPath)(models)(req, res)

    expect(res.statusCode).toBe(404)
    const data = JSON.parse(res._getData())
    expect(data.error).toEqual('collection not found')
  })
  it('should return an error when the request user does not have any assignation', async () => {
    const noAssignationEditor = cloneDeep(handlingEditor)
    const body = {
      type: 'handlingEditor',
      accept: false,
    }
    const req = httpMocks.createRequest({
      body,
    })
    delete noAssignationEditor.assignations
    req.user = noAssignationEditor
    req.params.collectionId = standardCollection.id
    const res = httpMocks.createResponse()
    const models = buildModels(standardCollection, noAssignationEditor)
    await require(postAssignationPath)(models)(req, res)

    expect(res.statusCode).toBe(400)
    const data = JSON.parse(res._getData())
    expect(data.error).toEqual('The user has no assignation')
  })
  it('should return an error when the request type the user assignation type do not match', async () => {
    const body = {
      type: 'aWrongType',
      accept: false,
    }
    const req = httpMocks.createRequest({
      body,
    })
    req.user = handlingEditor
    req.params.collectionId = standardCollection.id
    const res = httpMocks.createResponse()
    const models = buildModels(standardCollection, handlingEditor)
    await require(postAssignationPath)(models)(req, res)

    expect(res.statusCode).toBe(400)
    const data = JSON.parse(res._getData())
    expect(data.error).toEqual(
      'Request data does not match any user assignation',
    )
  })
  it('should return an error when the request collection and the user assignation collection do not match', async () => {
    const body = {
      type: 'handlingEditor',
      accept: false,
    }
    const req = httpMocks.createRequest({
      body,
    })
    req.user = handlingEditor
    req.params.collectionId = '123'
    const res = httpMocks.createResponse()
    const models = buildModels(standardCollection, handlingEditor)
    await require(postAssignationPath)(models)(req, res)

    expect(res.statusCode).toBe(400)
    const data = JSON.parse(res._getData())
    expect(data.error).toEqual(
      'Request data does not match any user assignation',
    )
  })
})
