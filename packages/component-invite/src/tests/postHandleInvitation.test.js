process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
process.env.SUPPRESS_NO_CONFIG_WARNING = true

const httpMocks = require('node-mocks-http')
const fixtures = require('./fixtures/fixtures')
const cloneDeep = require('lodash/cloneDeep')
const Model = require('./helpers/Model')

jest.mock('pubsweet-component-mail-service', () => ({
  setupAssignEmail: jest.fn(),
}))

const notFoundError = new Error()
notFoundError.name = 'NotFoundError'
notFoundError.status = 404

const { handlingEditor } = fixtures.users
const { standardCollection } = fixtures.collections
const { heTeam } = fixtures.teams

const postInvitationPath = '../routes/postHandleInvitation'
describe('Post handle invitation route handler', () => {
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
    const models = Model.build(standardCollection, acceptingHE, null, heTeam)
    await require(postInvitationPath)(models)(req, res)
    expect(res.statusCode).toBe(204)
    expect(acceptingHE.invitations[0].hasAnswer).toBeTruthy()
    expect(acceptingHE.invitations[0].isAccepted).toBeTruthy()
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
    const models = Model.build(standardCollection, refusingHE, null, heTeam)
    await require(postInvitationPath)(models)(req, res)

    expect(res.statusCode).toBe(204)
    expect(refusingHE.invitations[0].hasAnswer).toBeTruthy()
    expect(refusingHE.invitations[0].isAccepted).toBeFalsy()
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
    const models = Model.build(standardCollection, handlingEditor)
    await require(postInvitationPath)(models)(req, res)

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
    const models = Model.build(notFoundError, handlingEditor)
    await require(postInvitationPath)(models)(req, res)

    expect(res.statusCode).toBe(404)
    const data = JSON.parse(res._getData())
    expect(data.error).toEqual('collection not found')
  })
  it('should return an error when the request user does not have any invitation', async () => {
    const noInvitationEditor = cloneDeep(handlingEditor)
    const body = {
      type: 'handlingEditor',
      accept: false,
    }
    const req = httpMocks.createRequest({
      body,
    })
    delete noInvitationEditor.invitations
    req.user = noInvitationEditor
    req.params.collectionId = standardCollection.id
    const res = httpMocks.createResponse()
    const models = Model.build(standardCollection, noInvitationEditor)
    await require(postInvitationPath)(models)(req, res)

    expect(res.statusCode).toBe(400)
    const data = JSON.parse(res._getData())
    expect(data.error).toEqual('The user has no invitation')
  })
  it('should return an error when the request type the user invitation type do not match', async () => {
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
    const models = Model.build(standardCollection, handlingEditor)
    await require(postInvitationPath)(models)(req, res)

    expect(res.statusCode).toBe(400)
    const data = JSON.parse(res._getData())
    expect(data.error).toEqual(
      'Request data does not match any user invitation',
    )
  })
  it('should return an error when the request collection and the user invitation collection do not match', async () => {
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
    const models = Model.build(standardCollection, handlingEditor)
    await require(postInvitationPath)(models)(req, res)

    expect(res.statusCode).toBe(400)
    const data = JSON.parse(res._getData())
    expect(data.error).toEqual(
      'Request data does not match any user invitation',
    )
  })
})
