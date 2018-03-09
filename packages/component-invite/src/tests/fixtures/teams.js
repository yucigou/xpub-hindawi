const users = require('./users')
const collections = require('./collections')

const { standardCollection } = collections
const { editorInChief, handlingEditor, reviewer } = users
const teams = {
  eicTeam: {
    teamType: {
      name: 'editorInChief',
      permissions: 'editorInChief',
    },
    group: 'editorInChief',
    name: 'Editor in Chief',
    object: {
      type: 'collection',
      id: '123',
    },
    members: [editorInChief.id],
    save: jest.fn(() => teams.eicTeam),
    updateProperties: jest.fn(() => teams.eicTeam),
  },
  heTeam: {
    teamType: {
      name: 'handlingEditor',
      permissions: 'handlingEditor',
    },
    group: 'handlingEditor',
    name: 'HandlingEditor',
    object: {
      type: 'collection',
      id: standardCollection.id,
    },
    members: [handlingEditor.id],
    save: jest.fn(() => teams.heTeam),
    updateProperties: jest.fn(() => teams.heTeam),
    id: 'he123',
  },
  reviewerTeam: {
    teamType: {
      name: 'reviewer',
      permissions: 'reviewer',
    },
    group: 'reviewer',
    name: 'Reviewer',
    object: {
      type: 'collection',
      id: '123',
    },
    members: [reviewer.id],
    save: jest.fn(() => teams.reviewerTeam),
    updateProperties: jest.fn(() => teams.reviewerTeam),
  },
}
module.exports = teams
