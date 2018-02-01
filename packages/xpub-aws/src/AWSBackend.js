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
const AWSBackend = app => {
  app.use(bodyParser.json())
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
        const fileKey = `${req.body.fragmentId}/${uuid.v4()}`
        cb(null, fileKey)
      },
    }),
    fileFilter: (req, file, cb) => {
      if (
        req.body.fileType === 'manuscripts' ||
        req.body.fileType === 'coverLetter'
      ) {
        if (
          file.mimetype === 'application/pdf' ||
          file.mimetype === 'application/msword' ||
          file.mimetype ===
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ) {
          return cb(null, true)
        }
        req.fileValidationError = 'Only Word documents and PDFs are allowed'
        return cb(null, false)
      }

      return cb(null, true)
    },
  })
  app.post('/api/aws', authBearer, upload.single('file'), async (req, res) => {
    if (req.fileValidationError !== undefined) {
      return res.status(400).json({ error: req.fileValidationError })
    }

    res.status(200).json({
      id: req.file.key,
      name: req.file.originalname,
      size: req.file.size,
    })
  })
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
}

module.exports = AWSBackend
