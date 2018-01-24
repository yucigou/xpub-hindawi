module.exports = {
  client: {
    components: [() => require('./components')],
    reducers: {
      authors: () => require('./redux/authors').default,
    },
  },
}
