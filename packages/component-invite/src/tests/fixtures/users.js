module.exports = {
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
    password: 'test',
    admin: false,
    id: 'editor123',
    roles: ['editorInChief'],
  },
  handlingEditor: {
    type: 'user',
    username: 'handling',
    email: 'handling@example.com',
    password: 'test',
    admin: false,
    id: 'handling123',
    roles: ['handlingEditor'],
  },
}
