const bodyParser = require('body-parser')

const Invite = app => {
  app.use(bodyParser.json())
  const authBearer = app.locals.passport.authenticate('bearer', {
    session: false,
  })
  app.post(
    '/api/users/invite/:collectionId?',
    authBearer,
    require('./routes/postInvite')(app.locals.models),
  )
  app.get(
    '/api/users/invite',
    require('./routes/getInviteDetails')(app.locals.models),
  )
  app.post(
    '/api/users/invite/password/reset',
    bodyParser.json(),
    require('./routes/resetPassword')(app.locals.models),
  )
}

module.exports = Invite
