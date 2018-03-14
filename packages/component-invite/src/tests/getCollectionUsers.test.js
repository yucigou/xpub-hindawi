process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
process.env.SUPPRESS_NO_CONFIG_WARNING = true

const httpMocks = require('node-mocks-http')
const fixtures = require('./fixtures/fixtures')
const Model = require('./helpers/Model')

const { standardCollection } = fixtures.collections
const { editorInChief, admin } = fixtures.users
const query = {
  role: 'handlingEditor',
}
const getCollectionUsersPath = '../routes/getCollectionUsers'
describe('Get collection users route handler', () => {
  it('should return success when the role is correct, the collection exists and the request user is editorInChief ', async () => {
    const req = httpMocks.createRequest()
    req.query = query
    req.params.collectionId = standardCollection.id
    req.user = editorInChief.id
    const res = httpMocks.createResponse()
    const models = Model.build()
    await require(getCollectionUsersPath)(models)(req, res)

    expect(res.statusCode).toBe(200)
    const data = JSON.parse(res._getData())
    expect(data).toHaveLength(2)
  })
  it('should return an error when the role parameter is missing', async () => {
    delete query.role
    const req = httpMocks.createRequest()
    req.query = query
    req.user = editorInChief.id
    const res = httpMocks.createResponse()
    const models = Model.build()
    await require(getCollectionUsersPath)(models)(req, res)
    expect(res.statusCode).toBe(400)
    const data = JSON.parse(res._getData())
    expect(data.error).toEqual('Role is required')
    query.role = 'handlingEditor'
  })
  it('should return an error when the collection does not exist', async () => {
    const req = httpMocks.createRequest()
    req.query = query
    req.params.collectionId = 'invalid-id'
    req.user = editorInChief.id
    const res = httpMocks.createResponse()
    const models = Model.build()
    await require(getCollectionUsersPath)(models)(req, res)
    expect(res.statusCode).toBe(404)
    const data = JSON.parse(res._getData())
    expect(data.error).toEqual('collection not found')
  })
  it('should return an error when the role is invalid', async () => {
    query.role = 'invalidRole'
    const req = httpMocks.createRequest()
    req.query = query
    req.params.collectionId = standardCollection.id
    req.user = editorInChief.id
    const res = httpMocks.createResponse()
    const models = Model.build()
    await require(getCollectionUsersPath)(models)(req, res)
    expect(res.statusCode).toBe(400)
    const data = JSON.parse(res._getData())
    expect(data.error).toEqual(`Role ${query.role} is invalid`)
    query.role = 'handlingEditor'
  })
  it('should return an error when the request user is not editorInChief', async () => {
    const req = httpMocks.createRequest()
    req.query = query
    req.params.collectionId = standardCollection.id
    req.user = admin.id
    const res = httpMocks.createResponse()
    const models = Model.build()
    await require(getCollectionUsersPath)(models)(req, res)
    expect(res.statusCode).toBe(400)
    const data = JSON.parse(res._getData())
    expect(data.error).toEqual('The request user must be Editor in Chief')
  })
})
