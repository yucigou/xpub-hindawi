const authors = require('./authors')

const fragments = {
  standardFragment: {
    type: 'fragment',
    fragmentType: 'blogpost',
    title: 'Just your regular blogpost',
    source: '<blog></blog>',
    presentation: '<p></p>',
    authors: [authors.standardAuthor],
    save: () => fragments.standardFragment,
  },

  adminFragment: {
    type: 'fragment',
    fragmentType: 'blogpost',
    title: 'Just your admin blogpost',
    source: '<blog></blog>',
    presentation: '<p></p>',
    authors: [],
    save: () => fragments.adminFragment,
    owners: [],
  },
}

module.exports = fragments
