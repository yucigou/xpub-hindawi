function User(properties) {
  this.type = 'user'
  this.email = properties.email
  this.username = properties.username
  this.password = properties.password
}

User.prototype.save = jest.fn(() => {
  this.id = '111222'
  return Promise.resolve(this)
})

module.exports = User
