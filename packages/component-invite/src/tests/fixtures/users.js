const collections = require('./collections')
const { standardCollection } = collections

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
    roles: ['editorInChief'],
    passwordResetToken: 'token123',
    firstName: 'vlad',
    lastName: 'dracul',
    affiliation: 'MIT',
    title: 'prof',
    save: jest.fn(() => users.editorInChief),
    isConfirmed: false,
  },
  handlingEditor: {
    type: 'user',
    username: 'handling',
    email: 'handling@example.com',
    password: 'test',
    admin: false,
    id: 'handling123',
    roles: ['handlingEditor'],
    assignations: [
      {
        type: 'handlingEditor',
        hasAnswer: false,
        isAccepted: false,
        collectionId: standardCollection.id,
      },
    ],
    save: jest.fn(() => users.handlingEditor),
  },
  author: {
    type: 'user',
    username: 'author',
    email: 'author@example.com',
    password: 'test',
    admin: false,
    id: 'author123',
    roles: ['author'],
    passwordResetToken: 'token123',
    firstName: 'leopold',
    lastName: 'smith',
    affiliation: 'MIT',
    title: 'mr',
    save: jest.fn(() => users.author),
    isConfirmed: false,
  },
}

module.exports = users
