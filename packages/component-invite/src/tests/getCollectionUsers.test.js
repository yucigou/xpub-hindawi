process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
process.env.SUPPRESS_NO_CONFIG_WARNING = true

const httpMocks = require('node-mocks-http')
const fixtures = require('./fixtures/fixtures')
const Model = require('./helpers/Model')

const user = fixtures.users.editorInChief
const query = {
  role: 'handlingEditor',
}
const getCollectionUsersPath = '../routes/getCollectionUsers'
describe('Get collection users route handler', () => {
  it('should return success when the role is correct, the collection exists and the request user is editorInChief ', async () => {
    const req = httpMocks.createRequest()
    req.query = query
    req.params.collectionId = '2c4fb766-a798-4c32-b857-c5d21a2ab331'
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

    const res = httpMocks.createResponse()
    const models = Model.build(user)
    await require(getCollectionUsersPath)(models)(req, res)
    expect(res.statusCode).toBe(400)
    const data = JSON.parse(res._getData())
    expect(data.error).toEqual('Role is required')
    query.email = 'handlingEditor'
  })
})
