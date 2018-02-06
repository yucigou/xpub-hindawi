const bodyParser = require('body-parser')
const AWS = require('aws-sdk')
const uuid = require('uuid')
const nodemailer = require('nodemailer')

const AWSBackend = app => {
  app.use(bodyParser.json())
  const authBearer = app.locals.passport.authenticate('bearer', {
    session: false,
  })
  AWS.config.update({
    secretAccessKey: process.env.AWS_SECRET_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    region: process.env.AWS_REGION,
  })
  const s3 = new AWS.S3()
  const upload = require('./middeware/upload').setupMulter(s3)

  app.post(
    '/api/aws',
    authBearer,
    upload.single('file'),
    require('./routeHandlers/postFile'),
  )
  app.get('/api/aws/:fragmentId/:fileId', authBearer, async (req, res) => {
    const params = {
      Bucket: process.env.AWS_BUCKET,
      Key: `${req.params.fragmentId}/${req.params.fileId}`,
    }

    s3.getSignedUrl('getObject', params, (err, data) => {
      if (err) {
        res.status(err.statusCode).json({ error: err.message })
        return
      }
      res.status(200).json({
        signedUrl: data,
      })
    })
  })
  app.delete('/api/aws/:fragmentId/:fileId', authBearer, async (req, res) => {
    const params = {
      Bucket: process.env.AWS_BUCKET,
      Key: `${req.params.fragmentId}/${req.params.fileId}`,
    }
    s3.deleteObject(params, (err, data) => {
      if (err) {
        res.status(err.statusCode).json({ error: err.message })
        return
      }
      res.status(204).json()
    })
  })
  app.post('/api/aws/email', authBearer, async (req, res) => {
    AWS.config.update({
      secretAccessKey: process.env.SES_SECRET_KEY,
      accessKeyId: process.env.SES_ACCESS_KEY,
      region: process.env.AWS_REGION,
    })

    const reqUser = await app.locals.models.User.find(req.user)
    if (reqUser.admin === false) {
      res.status(403).json({ error: 'Not allowed' })
      return
    }
    try {
      const user = await app.locals.models.User.findByEmail(req.body.email)
      if (user) {
        res.status(400).json({ error: 'User already exists' })
        return
      }
    } catch (e) {
      if (e.name === 'NotFoundError') {
        const userBody = {
          username: uuid.v4().slice(0, 7),
          email: req.body.email,
          password: uuid.v4(),
        }
        const newUser = new app.locals.models.User(userBody)
        newUser.roles = {}
        newUser.roles.role = req.body.role
        await newUser.save()

        const transporter = nodemailer.createTransport({
          SES: new AWS.SES(),
        })
        transporter.sendMail(
          {
            from: 'sebastian.mihalache@thinslices.com',
            to: newUser.email,
            subject: 'Hindawi Inivation',
            text: 'You have been envited to join Hindawi as Editor in Chief',
            html: { path: `${process.cwd()}/assets/invite.html` },
          },
          (err, info) => {
            if (err) throw err
          },
        )
        res.status(204).json()
      }
    }
  })
}

module.exports = AWSBackend
