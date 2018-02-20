module.exports = {
  client: {
    components: [() => require('./components')],
    reducers: {
      modal: () => require('./redux/modal').default,
    },
  },
}
