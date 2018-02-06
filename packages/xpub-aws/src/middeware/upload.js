const multer = require('multer')
const multerS3 = require('multer-s3')
const uuid = require('uuid')

const setupMulter = s3 => {
  const upload = multer({
    storage: multerS3({
      s3,
      bucket: process.env.AWS_BUCKET,
      contentType: (req, file, cb) => {
        cb(null, file.mimetype)
      },
      key: (req, file, cb) => {
        const fileKey = `${req.body.fragmentId}/${uuid.v4()}`
        cb(null, fileKey)
      },
    }),
    fileFilter: (req, file, cb) => validateFile(req, file, cb),
  })

  return upload
}

const validateFile = (req, file, cb) => {
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
}

module.exports = {
  setupMulter,
  validateFile,
}
