const bodyParser = require('body-parser')

const AuthorBackend = app => {
  const authBearer = app.locals.passport.authenticate('bearer', {
    session: false,
  })
  app.post(
    '/api/fragments/:fragmentId/authors',
    authBearer,
    bodyParser.json(),
    async (req, res, next) => {
      try {
        if (!req.params.fragmentId) {
          res.status(400).json({ error: 'Fragment ID is required' })
          return
        }
        let fragment = await app.locals.models.Fragment.find(
          req.params.fragmentId,
        )
        fragment.authors = fragment.authors ? fragment.authors : []
        if (fragment.authors.length > 0) {
          const emailAuthors = fragment.authors.filter(
            author => author.email === req.body.email,
          )

          if (emailAuthors.length > 0) {
            res.status(400).json({ error: 'Author already exists' })
            return
          }

          const nameAuthors = fragment.authors.filter(
            author =>
              author.firstName === req.body.firstName &&
              author.middleName === req.body.middleName &&
              author.lastName === req.body.lastName,
          )

          if (nameAuthors.length > 0) {
            res.status(400).json({ error: 'Author already exists' })
            return
          }
        }
        fragment.authors.push(req.body)
        fragment = await fragment.save()
        res.status(200).json(fragment)
      } catch (e) {
        console.log(e)
        if (e.name === 'NotFoundError') {
          res.status(e.status).json({ error: 'Fragment not found' })
          return
        }

        if (e.name === 'ValidationError') {
          res.status(404).json({ error: e.details[0].message })
          return
        }
        res.status(400).json({ error: 'Something went wrong' })
      }
    },
  )
  app.delete(
    '/api/fragments/:fragmentId/authors/:authorEmail',
    authBearer,
    async (req, res, next) => {
      const { fragmentId, authorEmail } = req.params
      try {
        let fragment = await app.locals.models.Fragment.find(fragmentId)
        if (fragment.authors === 'undefined') {
          res.status(404).json({ error: 'Fragment does not have any authors' })
          return
        }

        if (fragment.authors.length === 0) {
          res.status(404).json({ error: 'Fragment does not have any authors' })
          return
        }

        const newAuthors = fragment.authors.filter(
          author => author.email !== authorEmail,
        )

        if (newAuthors.length === fragment.authors.length) {
          res.status(404).json({ error: 'Author not found' })
          return
        }

        fragment.authors = newAuthors
        fragment = await fragment.save()
        res.status(204).json({})
        return
      } catch (e) {
        if (e.name === 'NotFoundError') {
          res.status(e.status).json({ error: 'Fragment not found' })
          return
        }

        if (e.name === 'ValidationError') {
          res.status(404).json({ error: e.details[0].message })
          return
        }
        res.status(400).json({ error: 'Something went wrong' })
      }
    },
  )
}

module.exports = AuthorBackend
