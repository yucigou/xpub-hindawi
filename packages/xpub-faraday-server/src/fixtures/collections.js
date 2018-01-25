const fragments = require('./fragments')
const users = require('./users')

const collections = {
  standardCollection: {
    id: '2c4fb766-a798-4c32-b857-c5d21a2ab331',
    title: 'Standard Collection',
    type: 'collection',
    fragments: [fragments.standardFragment, fragments.adminFragment],
    owners: [users.admin.id],
    save: jest.fn(),
  },
}

module.exports = collections
