module.exports = {
  client: {
    components: [() => require('./components')],
    reducers: {
      wizardConversion: () => require('./redux/conversion').default,
      autosave: () => require('./redux/autosave').default,
    },
  },
}
