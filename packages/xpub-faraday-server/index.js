module.exports = {
  backend: () => app => require('./src/AuthorBackend')(app),
}
