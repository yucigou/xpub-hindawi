const AuthorBackend = app => {
  app.get('/api/author', (req, res, next) => {
    console.log(app)
    res.status(400).json({ error: 'Username must be specified' })
  })
}

module.exports = AuthorBackend
