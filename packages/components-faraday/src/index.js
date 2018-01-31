module.exports = {
  client: {
    components: [() => require('./components')],
    reducers: {
      authors: () => require('./redux/authors').default,
      filters: () => require('./components/Dashboard/redux/filters').default,
    },
  },
}
