module.exports = {
  server: () => app => require('./AuthorBacked')(app),
}
