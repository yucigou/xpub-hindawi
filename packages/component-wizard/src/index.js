module.exports = {
  client: {
    components: [() => require('./components')],
    reducers: {
      wizardConversion: () => require('./redux/conversion').default,
      authors: () => require('./redux/authors').default,
      autosave: () => require('./redux/autosave').default,
    },
  },
}
