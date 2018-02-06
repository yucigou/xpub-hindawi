function Fragment(properties) {
  this.type = properties.type
  this.fragmentType = properties.fragmentType
  this.title = properties.title
  this.source = properties.source
  this.presentation = properties.presentation
  this.authors = properties.authors
  this.owners = properties.owners
  this.save = jest.fn(() => Promise.resolve(this))
}

module.exports = Fragment
