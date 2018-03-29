const Chance = require('chance')

const chance = new Chance()

module.exports = {
  handlingEditor: {
    id: chance.guid(),
    email: chance.email(),
    firstName: chance.first(),
    lastName: chance.last(),
  },
  submittingAuthor: {
    id: chance.guid(),
    email: chance.email(),
    firstName: chance.first(),
    lastName: chance.last(),
  },
  admin: {
    id: chance.guid(),
    email: chance.email(),
  },
}
