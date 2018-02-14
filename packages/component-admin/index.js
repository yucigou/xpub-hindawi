module.exports = {
  backend: () => app => require('./src/User')(app),
}
