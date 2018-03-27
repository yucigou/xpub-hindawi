const Chance = require('chance')
const { handlingEditor } = require('./userData')

const chance = new Chance()
module.exports = {
  standardCollection: {
    id: chance.guid(),
    title: 'Standard Collection',
    type: 'collection',
    fragments: [],
    owners: [],
    save: jest.fn(),
    assignedPeople: [
      {
        id: handlingEditor.id,
        name: `${handlingEditor.firstName} ${handlingEditor.lastName}`,
        role: 'handlingEditor',
        email: handlingEditor.email,
        hasAnswer: false,
        isAccepted: false,
      },
    ],
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
