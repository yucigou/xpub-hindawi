module.exports = {
  client: {
    components: [() => require('./components')],
    reducers: {
      authors: () => require('./redux/authors').default,
      files: () => require('./redux/files').default,
      modal: () => require('./redux/modal').default,
    },
  },
}
