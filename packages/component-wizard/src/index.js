module.exports = {
  client: {
    components: [() => require('./components')],
    reducers: {
      conversion: () => require('./redux/conversion').default,
      authors: () => require('./redux/authors').default,
    },
  },
}
