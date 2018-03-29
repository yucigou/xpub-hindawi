const Chance = require('chance')
const { handlingEditor, submittingAuthor } = require('./userData')

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
  authorsCollection: {
    id: chance.guid(),
    title: chance.sentence(),
    type: 'collection',
    fragments: [],
    owners: [submittingAuthor.id],
    save: jest.fn(),
  },
}
