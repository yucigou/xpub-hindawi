const author = {
  firstName: 'Andrew',
  middleName: '',
  lastName: 'Smith',
  email: 'email@email.com',
  affiliation: 'University',
  country: '',
  isCorresponding: true,
  isSubmitting: true,
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

module.exports = {
  author,
  invalidAuthor,
  fragment,
  newSubmittingAuthor,
}
