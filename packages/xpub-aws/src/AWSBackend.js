const bodyParser = require('body-parser')
const AWS = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

AWS.config.update({
  secretAccessKey: process.env.AWS_SECRET_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  region: process.env.AWS_REGION,
})
// const fileName = Date.now().toString()
const AWSBackend = app => {
  const authBearer = app.locals.passport.authenticate('bearer', {
    session: false,
  })
  const s3 = new AWS.S3()
  const upload = multer({
    storage: multerS3({
      s3,
      bucket: process.env.AWS_BUCKET,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: (req, file, cb) => {
        // console.log('key cb:', file)
        cb(null, file.originalname)
      },
    }),
  })
  app.post(
    '/api/aws-upload',
    authBearer,
    bodyParser.json(),
    upload.single('file'),
    async (req, res) => {
      try {
        // console.log('FILE:', req.file)
        const params = {
          Bucket: process.env.AWS_BUCKET,
          Key: req.file.originalname,
        }

        s3.getSignedUrl('getObject', params, (err, data) => {
          if (err) throw err
          res.status(200).json({ signedUrl: data })
        })
      } catch (e) {
        res.status(400).json({ error: e })
      }
    },
  )
}

module.exports = AWSBackend
