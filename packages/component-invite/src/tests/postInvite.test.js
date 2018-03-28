process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
process.env.SUPPRESS_NO_CONFIG_WARNING = true

const httpMocks = require('node-mocks-http')
const random = require('lodash/random')
const fixtures = require('./fixtures/fixtures')
const Chance = require('chance')
const Model = require('./helpers/Model')
const config = require('config')

const configRoles = config.get('roles')

const models = Model.build()
jest.mock('pubsweet-component-mail-service', () => ({
  setupInviteEmail: jest.fn(),
  setupAssignEmail: jest.fn(),
  setupDeclineEmail: jest.fn(),
}))
const chance = new Chance()
const globalRoles = configRoles.global
const body = {
  email: chance.email(),
  role: globalRoles[random(0, globalRoles.length - 1)],
  firstName: chance.first(),
  lastName: chance.last(),
  title: 'professor',
  affiliation: 'MIT',
}
body.admin = body.role === 'admin'

const notFoundError = new Error()
notFoundError.name = 'NotFoundError'
notFoundError.status = 404

const {
  admin,
  editorInChief,
  handlingEditor,
  author,
  invitedHandlingEditor,
} = fixtures.users
const { standardCollection } = fixtures.collections
const { heTeam } = fixtures.teams
const postInvitePath = '../routes/postInvite'
describe('Post invite route handler', () => {
  it('should return success when the admin invites a global role', async () => {
    const req = httpMocks.createRequest({
      body,
    })
    req.user = admin.id
    const res = httpMocks.createResponse()
    await require(postInvitePath)(models)(req, res)

    expect(res.statusCode).toBe(200)
    const data = JSON.parse(res._getData())
    expect(data.firstName).toEqual(body.firstName)
    expect(data.email).toEqual(body.email)
    expect(data.admin).toEqual(body.admin)
  })
  it('should return an error params are missing', async () => {
    delete body.email
    const req = httpMocks.createRequest({
      body,
    })
    req.user = admin.id
    const res = httpMocks.createResponse()
    await require(postInvitePath)(models)(req, res)
    expect(res.statusCode).toBe(400)
    const data = JSON.parse(res._getData())
    expect(data.error).toEqual('Email and role are required')
    body.email = chance.email()
  })
  it('should return an error when the a non-admin invites a editorInChief on a collection', async () => {
    body.role = 'editorInChief'
    body.admin = body.role === 'admin'
    const req = httpMocks.createRequest({
      body,
    })
    req.user = editorInChief.id
    req.params.collectionId = standardCollection.id
    const res = httpMocks.createResponse()
    await require(postInvitePath)(models)(req, res)
    // expect(res.statusCode).toBe(403)
    const data = JSON.parse(res._getData())
    expect(data.error).toEqual(`Role ${body.role} cannot be set on collections`)
  })
  it('should return an error when an editorInChief invites a handlingEditor without a collection', async () => {
    body.role = 'handlingEditor'
    body.admin = false
    const req = httpMocks.createRequest({
      body,
    })
    req.user = editorInChief.id
    const res = httpMocks.createResponse()

    await require(postInvitePath)(models)(req, res)
    expect(res.statusCode).toBe(403)
    const data = JSON.parse(res._getData())
    expect(data.error).toEqual(
      `${editorInChief.username} cannot invite a ${
        body.role
      } without a collection`,
    )
  })
  it('should return an error when an handlingEditor invites a reviewer without a collection', async () => {
    body.role = 'reviewer'
    body.admin = false
    const req = httpMocks.createRequest({
      body,
    })
    req.user = handlingEditor.id
    const res = httpMocks.createResponse()
    await require(postInvitePath)(models)(req, res)
    expect(res.statusCode).toBe(403)
    const data = JSON.parse(res._getData())
    expect(data.error).toEqual(
      `${handlingEditor.username} cannot invite a ${
        body.role
      } without a collection`,
    )
  })
  it('should return an error when inviting an existing user with a global role', async () => {
    body.role = globalRoles[random(0, globalRoles.length - 1)]
    body.admin = body.role === 'admin'
    body.email = author.email
    const req = httpMocks.createRequest({
      body,
    })
    req.user = admin.id
    const res = httpMocks.createResponse()
    await require(postInvitePath)(models)(req, res)

    expect(res.statusCode).toBe(400)
    const data = JSON.parse(res._getData())
    expect(data.error).toEqual('User already exists')
  })
  it('should return success when the editor in chief invites a handlingEditor with a collection', async () => {
    const body = {
      email: author.email,
      role: 'handlingEditor',
    }
    const req = httpMocks.createRequest({
      body,
    })
    req.user = editorInChief.id
    const initialSize = standardCollection.assignedPeople.length
    req.params.collectionId = standardCollection.id
    const res = httpMocks.createResponse()
    await require(postInvitePath)(models)(req, res)

    expect(res.statusCode).toBe(200)
    const data = JSON.parse(res._getData())
    expect(data.email).toEqual(body.email)
    expect(data.invitations[0].collectionId).toEqual(req.params.collectionId)
    expect(standardCollection.assignedPeople.length).toBeGreaterThan(
      initialSize,
    )
    expect(heTeam.members).toContain(author.id)
    expect(author.teams).toContain(heTeam.id)
  })
  it('should return success when the handlingEditor invites a reviewer with a collection', async () => {
    const body = {
      email: author.email,
      role: 'reviewer',
    }
    const req = httpMocks.createRequest({
      body,
    })
    req.user = handlingEditor.id
    req.params.collectionId = standardCollection.id
    const res = httpMocks.createResponse()
    await require(postInvitePath)(models)(req, res)

    expect(res.statusCode).toBe(200)
    const data = JSON.parse(res._getData())
    expect(data.email).toEqual(body.email)
    expect(data.invitations[0].collectionId).toEqual(req.params.collectionId)
  })
  it('should return an error when inviting his self', async () => {
    body.role = globalRoles[random(0, globalRoles.length - 1)]
    body.admin = body.role === 'admin'
    body.email = admin.email
    const req = httpMocks.createRequest({
      body,
    })
    req.user = admin.id
    const res = httpMocks.createResponse()
    await require(postInvitePath)(models)(req, res)

    expect(res.statusCode).toBe(400)
    const data = JSON.parse(res._getData())
    expect(data.error).toEqual('Cannot invite yourself')
  })
  it('should return an error when the role is invalid', async () => {
    body.role = 'someRandomRole'
    const req = httpMocks.createRequest({
      body,
    })
    req.user = editorInChief.id
    const res = httpMocks.createResponse()
    await require(postInvitePath)(models)(req, res)
    const data = JSON.parse(res._getData())
    expect(data.error).toEqual(`Role ${body.role} is invalid`)
  })
  it('should return success when the EiC resends an invitation to a handlingEditor with a collection', async () => {
    const body = {
      email: invitedHandlingEditor.email,
      role: 'handlingEditor',
    }
    const req = httpMocks.createRequest({
      body,
    })
    req.user = editorInChief.id
    req.params.collectionId = standardCollection.id
    const res = httpMocks.createResponse()
    await require(postInvitePath)(models)(req, res)

    expect(res.statusCode).toBe(200)
    const data = JSON.parse(res._getData())
    expect(data.email).toEqual(body.email)
    expect(data.invitations[0].collectionId).toEqual(req.params.collectionId)
    expect(data.invitations).toHaveLength(1)
  })
})
