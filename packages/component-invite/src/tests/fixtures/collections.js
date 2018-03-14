const Chance = require('chance')

const chance = new Chance()
module.exports = {
  standardCollection: {
    id: chance.guid(),
    title: 'Standard Collection',
    type: 'collection',
    fragments: [],
    owners: [],
    save: jest.fn(),
  },
  noTeamCollection: {
    id: chance.guid(),
    title: 'No Team Collection',
    type: 'collection',
    fragments: [],
    owners: [],
    save: jest.fn(),
  },
}
