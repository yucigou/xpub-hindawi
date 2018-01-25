const users = {
  standardUser: {
    type: 'user',
    username: 'testuser',
    email: 'test@example.com',
    password: 'test',
  },
  admin: {
    type: 'user',
    username: 'admin',
    email: 'admin@example.com',
    password: 'test',
    admin: true,
    id: 'admin123',
  },
  existingUser: {
    type: 'user',
    username: 'authoruser',
    email: 'email@email.com',
    password: 'test',
    id: '123987',
  },
}

module.exports = users
