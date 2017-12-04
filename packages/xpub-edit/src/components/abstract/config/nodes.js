const doc = {
  content: 'block+',
}

const paragraph = {
  content: 'inline*',
  group: 'block',
  parseDOM: [{ tag: 'p' }],
  toDOM: () => ['p', 0],
}

const heading = {
  attrs: {
    level: { default: 1 },
  },
  content: 'inline*',
  defining: true,
  group: 'block',
  parseDOM: [{ tag: 'h1', attrs: { level: 1 } }],
  toDOM: node => ['h' + node.attrs.level, 0],
}

const text = {
  group: 'inline',
}

export default {
  doc,
  heading,
  paragraph,
  text,
}
