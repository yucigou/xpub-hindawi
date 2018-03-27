const { standardCollection } = require('./collections')
const { heTeamID, reviewerTeamID } = require('./teamIDs')
const { handlingEditor } = require('./userData')

const users = {
  admin: {
    type: 'user',
    username: 'admin',
    email: 'admin@example.com',
    password: 'test',
    admin: true,
    id: 'admin123',
  },
  editorInChief: {
    type: 'user',
    username: 'editor',
    email: 'editor@example.com',
    password: 'test1234',
    admin: false,
    id: 'editor123',
    passwordResetToken: 'token123',
    firstName: 'john',
    lastName: 'smith',
    affiliation: 'MIT',
    title: 'Mr',
    save: jest.fn(() => users.editorInChief),
    isConfirmed: false,
    editorInChief: true,
  },
  handlingEditor: {
    type: 'user',
    username: 'handling',
    email: handlingEditor.email,
    password: 'test',
    admin: false,
    id: handlingEditor.id,
    firstName: handlingEditor.firstName,
    lastName: handlingEditor.lastName,
    invitations: [
      {
        type: 'handlingEditor',
        hasAnswer: false,
        isAccepted: false,
        collectionId: standardCollection.id,
        timestamp: Date.now(),
        teamId: heTeamID,
      },
    ],
    teams: [heTeamID],
    save: jest.fn(() => users.handlingEditor),
    editorInChief: false,
  },
  author: {
    type: 'user',
    username: 'author',
    email: 'author@example.com',
    password: 'test',
    admin: false,
    id: 'author123',
    passwordResetToken: 'token123',
    firstName: 'leopold',
    lastName: 'smith',
    affiliation: 'MIT',
    title: 'Mr',
    save: jest.fn(() => users.author),
    isConfirmed: false,
  },
  reviewer: {
    type: 'user',
    username: 'reviewer',
    email: 'reviewer@example.com',
    password: 'test',
    admin: false,
    id: 'reviewer123',
    passwordResetToken: 'token123',
    firstName: 'angela',
    lastName: 'smith',
    affiliation: 'MIT',
    title: 'Ms',
    save: jest.fn(() => users.reviewer),
    isConfirmed: false,
    teams: [reviewerTeamID],
    invitations: [
      {
        type: 'reviewer',
        hasAnswer: false,
        isAccepted: false,
        collectionId: '123',
        timestamp: Date.now(),
        teamId: reviewerTeamID,
      },
    ],
  },
  invitedHandlingEditor: {
    type: 'user',
    username: 'handling',
    email: 'handling@example.com',
    password: 'test',
    admin: false,
    id: 'invitedHandling123',
    firstName: 'Invited',
    lastName: 'HE',
    invitations: [
      {
        type: 'handlingEditor',
        hasAnswer: true,
        isAccepted: false,
        collectionId: standardCollection.id,
        timestamp: Date.now(),
        teamId: heTeamID,
      },
    ],
    teams: [heTeamID],
    save: jest.fn(() => users.handlingEditor),
    editorInChief: false,
  },
}

module.exports = users
