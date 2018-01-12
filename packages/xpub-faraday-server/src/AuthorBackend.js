const bodyParser = require('body-parser')

const AuthorBackend = app => {
  app.post(
    '/api/:fragmentId/author',
    bodyParser.json(),
    async (req, res, next) => {
      try {
        let fragment = await app.locals.models.Fragment.find(
          req.params.fragmentId,
        )
        fragment.authors = fragment.authors ? fragment.authors : []
        fragment.authors.push(req.body)
        fragment = await fragment.save()
        res.status(200).json(fragment)
      } catch (e) {
        res.status(400).json({ error: e })
      }
    },
  )
}

module.exports = AuthorBackend
