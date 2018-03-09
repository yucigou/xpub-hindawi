module.exports = {
  backend: () => app => {
    require('./src/Invite')(app)
    require('./src/AcceptRefuseWork')(app)
  },
}
