process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
process.env.SUPPRESS_NO_CONFIG_WARNING = true

const bodyParser = require('body-parser')
const supertest = require('supertest')
const component = require('..')
const express = require('express')
const fixtures = require('./fixtures/fixtures')
const passport = require('passport')
const BearerStrategy = require('passport-http-bearer').Strategy
const cloneDeep = require('lodash/cloneDeep')

function makeApp(fragment, user, existingUser, newUser) {
  const app = express()
  app.use(bodyParser.json())
  // Passport strategies
  app.use(passport.initialize())
  passport.use(
    'bearer',
    new BearerStrategy((token, done) =>
      done(null, fixtures.user, { scope: 'all' }),
    ),
  )
  app.locals.passport = passport
  app.locals.models = {
    Fragment: {
      find: jest.fn(
        () =>
          fragment instanceof Error
            ? Promise.reject(fragment)
            : Promise.resolve(fragment),
      ),
    },
    User: {
      find: jest.fn(
        () =>
          user instanceof Error ? Promise.reject(user) : Promise.resolve(user),
      ),
      findByEmail: jest.fn(
        () =>
          existingUser instanceof Error
            ? Promise.reject(existingUser)
            : Promise.resolve(existingUser),
      ),
    },
  }

  component.backend()(app)
  return supertest(app)
}

describe('Author Backend API', () => {
  let testFixtures = {}
  beforeEach(() => (testFixtures = cloneDeep(fixtures)))

  it('should return an error if fragment is not found', () => {
    const error = new Error()
    error.name = 'NotFoundError'
    error.status = 404
    return makeApp(error)
      .post('/api/fragments/123/authors')
      .set('Authorization', 'Bearer 123')
      .send(testFixtures.author)
      .expect(404, '{"error":"Fragment not found"}')
  })

  it('should return an error if an author field is invalid', () => {
    const error = new Error()
    error.name = 'ValidationError'
    error.status = 404
    error.details = []
    error.details.push({ message: 'firstName is required' })
    return makeApp(error)
      .post('/api/fragments/123/authors')
      .set('Authorization', 'Bearer 123')
      .send(testFixtures.invalidAuthor)
      .expect(404, '{"error":"firstName is required"}')
  })

  it('should return an error if an author already exists with the same email', () =>
    makeApp(testFixtures.fragment)
      .post('/api/fragments/123-valid-id/authors')
      .set('Authorization', 'Bearer 123')
      .send(testFixtures.author)
      .expect(400, '{"error":"Author with the same email already exists"}'))

  it('should return an error if there already is a submitting author', () =>
    makeApp(testFixtures.fragment)
      .post('/api/fragments/123-valid-id/authors')
      .set('Authorization', 'Bearer 123')
      .send(testFixtures.newSubmittingAuthor)
      .expect(400, '{"error":"There can only be one sumbitting author"}'))

  it('should return success when saving a new author', () =>
    makeApp(testFixtures.fragment, testFixtures.user)
      .post('/api/fragments/123-valid-id/authors')
      .set('Authorization', 'Bearer 123')
      .send(testFixtures.newAuthor)
      .expect(200, '')
      .then(() => expect(testFixtures.fragment.save).toHaveBeenCalled()))

  it('should return success when the admin adds a submitting author and the author already has a corresponding user account', () =>
    makeApp(
      testFixtures.adminFragment,
      testFixtures.admin,
      testFixtures.existingUser,
    )
      .post('/api/fragments/123-valid-id/authors')
      .set('Authorization', 'Bearer 123')
      .send(testFixtures.author)
      .expect(200, '')
      .then(() => {
        expect(testFixtures.adminFragment.save).toHaveBeenCalled()
        expect(testFixtures.adminFragment.owners.length).toBeGreaterThan(0)
        expect(testFixtures.adminFragment.owners[0]).toBe('123987')
      }))

  // it('should return success when the admin adds a submitting author and creates a corresponding user account', () => {
  //   const error = new Error()
  //   error.name = 'NotFoundError'
  //   error.status = 404
  //   const newUser = {
  //     username: `${testFixtures.author.firstName}${
  //       testFixtures.author.lastName
  //     }${Math.floor(Math.random() * 100)}`,
  //     email: testFixtures.author.email,
  //     password: 'test',
  //     id: '888999',
  //   }
  //   // console.log(testFixtures.adminFragment)
  //   return makeApp(
  //     testFixtures.adminFragment,
  //     testFixtures.admin,
  //     error,
  //     newUser,
  //   )
  //     .post('/api/fragments/123-valid-id/authors')
  //     .set('Authorization', 'Bearer 123')
  //     .send(testFixtures.author)
  //     .expect(200, '')
  //     .then(() => {
  //       expect(testFixtures.adminFragment.save).toHaveBeenCalled()
  //       expect(testFixtures.adminFragment.owners.length).toBeGreaterThan(0)
  //       expect(testFixtures.adminFragment.owners[0]).toBe('888999')
  //     })
  // })
})
