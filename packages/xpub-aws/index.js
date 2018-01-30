require('dotenv').config()

module.exports = {
  backend: () => app => require('./src/AWSBackend')(app),
}
