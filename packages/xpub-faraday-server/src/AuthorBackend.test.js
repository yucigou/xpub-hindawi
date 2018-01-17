process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
process.env.SUPPRESS_NO_CONFIG_WARNING = true

const bodyParser = require('body-parser')
// const express = require('express')
const supertest = require('supertest')
const component = require('..')
const app = require('../../xpub-faraday/app')

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNlYmkiLCJpZCI6IjVlMTRiY2IyLWQ5ZTEtNDZjOS05ZDI0LTM3YTk4MDhmMjFmYiIsImlhdCI6MTUxNjExODAxMSwiZXhwIjoxNTE2MjA0NDExfQ.tqH0Nnpiec2c1FPL2K5fK4krHGN2SrYyMbqVSnYSpog'

function makeApp(response) {
  // const app = express()
  app.use(bodyParser.json())
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
  component.backend(app)
  return supertest(app)
}

describe('Author Backend API', () => {
  it('should return error if fragment is not found', () =>
    makeApp()
      .post('/api/fragments/cf7b9ea6-47ac-4188-b0ef-f89cc17364fe2/authors')
      .set('Content-Type', 'application/json')
      .set('Authentication', `Bearer ${token}`)
      .send({})
      .expect(404, '"error": "Fragment not found"'))
})
