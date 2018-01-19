process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
process.env.SUPPRESS_NO_CONFIG_WARNING = true

const bodyParser = require('body-parser')
const supertest = require('supertest')
const component = require('..')
const express = require('express')
const fixtures = require('./fixtures/fixtures')
const passport = require('passport')
// const AnonymousStrategy = require('passport-anonymous').Strategy
const jwt = require('jsonwebtoken')
const BearerStrategy = require('passport-http-bearer').Strategy
const config = require('config')

function makeApp(response) {
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
          response instanceof Error
            ? Promise.reject(response)
            : Promise.resolve(response),
      ),
    },
  }

  component.backend()(app)
  return supertest(app)
}

describe('Author Backend API', () => {
  it('should return an error if fragment is not found', () => {
    const error = new Error()
    error.name = 'NotFoundError'
    error.status = 404
    return makeApp(error)
      .post('/api/fragments/123/authors')
      .set('Authorization', 'Bearer 123')
      .send(fixtures.author)
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
      .send(fixtures.invalidAuthor)
      .expect(404, '{"error":"firstName is required"}')
  })

  it('should return an error if an author already exists with the same email', () =>
    makeApp(fixtures.fragment)
      .post('/api/fragments/123-valid-id/authors')
      .set('Authorization', 'Bearer 123')
      .send(fixtures.author)
      .expect(400, '{"error":"Author with the same email already exists"}'))

  it('should return an error if there already is a submitting author', () =>
    makeApp(fixtures.fragment)
      .post('/api/fragments/123-valid-id/authors')
      .set('Authorization', 'Bearer 123')
      .send(fixtures.newSubmittingAuthor)
      .expect(400, '{"error":"There can only be one sumbitting author"}'))

  it('should return success', () =>
    makeApp(fixtures.fragment)
      .post('/api/fragments/123-valid-id/authors')
      .set('Authorization', 'Bearer 123')
      .send(fixtures.newAuthor)
      .expect(200, '')
      .then(() => expect(fixtures.fragment.save).toHaveBeenCalled()))
})
