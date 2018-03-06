const bodyParser = require('body-parser')

const Assignation = app => {
  app.use(bodyParser.json())
  const authBearer = app.locals.passport.authenticate('bearer', {
    session: false,
  })
  app.post(
    '/api/collections/:collectionId/users',
    authBearer,
    require('./routes/postAssignation')(app.locals.models),
  )
}

module.exports = Assignation
