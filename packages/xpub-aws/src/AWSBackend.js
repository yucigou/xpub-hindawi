const bodyParser = require('body-parser')
const AWS = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const uuid = require('uuid')

AWS.config.update({
  secretAccessKey: process.env.AWS_SECRET_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  region: process.env.AWS_REGION,
})
const fileKey = uuid.v4()
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
        // console.log('key cb:', fileKey)
        cb(null, fileKey)
      },
    }),
  })
  app.post(
    '/api/aws-upload',
    authBearer,
    bodyParser.json(),
    upload.single('file'),
    async (req, res) => {
      // console.log('FILE:', req.file)
      const params = {
        Bucket: process.env.AWS_BUCKET,
        Key: fileKey,
      }

      s3.getSignedUrl('getObject', params, (err, data) => {
        if (err) {
          res.status(err.statusCode).json({ error: err.message })
          return
        }
        res.status(200).json({
          id: req.file.key,
          name: req.file.originalname,
          size: req.file.size,
          signedUrl: data,
        })
      })
    },
  )
  app.delete('/api/aws-delete/:fileId', authBearer, async (req, res) => {
    const params = {
      Bucket: process.env.AWS_BUCKET,
      Key: req.params.fileId,
    }
    s3.deleteObject(params, (err, data) => {
      if (err) {
        res.status(err.statusCode).json({ error: err.message })
        return
      }
      res.status(200).json()
    })
  })
}

module.exports = AWSBackend
