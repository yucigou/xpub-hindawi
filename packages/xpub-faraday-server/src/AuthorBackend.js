const bodyParser = require('body-parser')
const uuid = require('uuid')

const AuthorBackend = app => {
  const authBearer = app.locals.passport.authenticate('bearer', {
    session: false,
  })
  app.post(
    '/api/collections/:collectionId/fragments/:fragmentId/authors',
    authBearer,
    bodyParser.json(),
    async (req, res, next) => {
      try {
        let fragment = await app.locals.models.Fragment.find(
          req.params.fragmentId,
        )
        const collection = await app.locals.models.Collection.find(
          req.params.collectionId,
        )

        fragment.authors = fragment.authors ? fragment.authors : []
        if (fragment.authors.length > 0) {
          const emailAuthors = fragment.authors.filter(
            author => author.email === req.body.email,
          )

          if (emailAuthors.length > 0) {
            res
              .status(400)
              .json({ error: 'Author with the same email already exists' })
            return
          }

          const submittingAuthors = fragment.authors.filter(
            author =>
              author.isSubmitting === true &&
              author.isSubmitting === req.body.isSubmitting,
          )

          if (submittingAuthors.length > 0) {
            res
              .status(400)
              .json({ error: 'There can only be one sumbitting author' })
            return
          }
        }
        req.body.id = uuid.v4()
        fragment.authors.push(req.body)
        const reqUser = await app.locals.models.User.find(req.user)
        if (reqUser.admin === true && req.body.isSubmitting === true) {
          try {
            // check if author has corresponding user
            const user = await app.locals.models.User.findByEmail(
              req.body.email,
            )
            fragment.owners.push(user.id)
            collection.owners.push(user.id)
          } catch (e) {
            if (e.name === 'NotFoundError') {
              // create a new User account
              const userBody = {
                username: `${req.body.firstName}${
                  req.body.lastName
                }${Math.floor(Math.random() * 1000)}`,
                email: req.body.email,
                password: uuid.v4(),
              }
              let newUser = new app.locals.models.User(userBody)
              newUser = await newUser.save()
              fragment.owners.push(newUser.id)
              collection.owners.push(newUser.id)
            }
          }
        }
        fragment = await fragment.save()
        await collection.save()
        res.status(200).json(fragment.authors[fragment.authors.length - 1])
      } catch (e) {
        if (e.name === 'NotFoundError') {
          res.status(e.status).json({ error: 'Object not found' })
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
