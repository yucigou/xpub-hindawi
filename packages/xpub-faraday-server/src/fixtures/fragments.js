const authors = require('./authors')

const fragments = {
  standardFragment: {
    type: 'fragment',
    fragmentType: 'blogpost',
    title: 'Just your regular blogpost',
    source: '<blog></blog>',
    presentation: '<p></p>',
    authors: [authors.standardAuthor],
    save: jest.fn(),
  },

  adminFragment: {
    type: 'fragment',
    fragmentType: 'blogpost',
    title: 'Just your admin blogpost',
    source: '<blog></blog>',
    presentation: '<p></p>',
    authors: [],
    save: jest.fn(),
    owners: [],
  },
}

module.exports = fragments
