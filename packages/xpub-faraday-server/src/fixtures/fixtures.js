const author = {
  firstName: 'Andrew',
  middleName: '',
  lastName: 'Smith',
  email: 'email@email.com',
  affiliation: 'University',
  country: '',
  isCorresponding: false,
  isSubmitting: true,
  id: '123',
}

const newAuthor = {
  firstName: 'Robert',
  middleName: '',
  lastName: 'Smith',
  email: 'email_robert@email.com',
  affiliation: 'University',
  country: '',
  isCorresponding: true,
  isSubmitting: false,
  id: '456',
}

const invalidAuthor = {
  firstName: '',
  middleName: '',
  lastName: 'Jones',
  email: 'email2@email.com',
  affiliation: 'University',
  country: '',
  isCorresponding: false,
  isSubmitting: false,
  id: '768',
}

const newSubmittingAuthor = {
  firstName: 'Andrew',
  middleName: '',
  lastName: 'Smith',
  email: 'email3@email.com',
  affiliation: 'University',
  country: '',
  isCorresponding: false,
  isSubmitting: true,
  id: '879',
}

const fragment = {
  type: 'fragment',
  fragmentType: 'blogpost',
  title: 'Just your regular blogpost',
  source: '<blog></blog>',
  presentation: '<p></p>',
  authors: [author],
  save: jest.fn(),
}

const adminFragment = {
  type: 'fragment',
  fragmentType: 'blogpost',
  title: 'Just your admin blogpost',
  source: '<blog></blog>',
  presentation: '<p></p>',
  authors: [],
  save: jest.fn(),
  owners: [],
}

const user = {
  type: 'user',
  username: 'testuser',
  email: 'test@example.com',
  password: 'test',
}

const admin = {
  type: 'user',
  username: 'admin',
  email: 'admin@example.com',
  password: 'test',
  admin: true,
}

const existingUser = {
  type: 'user',
  username: 'authoruser',
  email: 'email@email.com',
  password: 'test',
  id: '123987',
}

module.exports = {
  author,
  invalidAuthor,
  fragment,
  newSubmittingAuthor,
  newAuthor,
  user,
  admin,
  adminFragment,
  existingUser,
}
