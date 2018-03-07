const AWS = require('aws-sdk')
const _ = require('lodash')
const util = require('util')
const config = require('config')
const archiver = require('archiver')
// const logger = require('@pubsweet/logger')

const s3Config = _.get(config, 'pubsweet-component-aws-s3')

const FileBackend = app => {
  const authBearer = app.locals.passport.authenticate('bearer', {
    session: false,
  })
  AWS.config.update({
    secretAccessKey: s3Config.secretAccessKey,
    accessKeyId: s3Config.accessKeyId,
    region: s3Config.region,
  })
  const s3 = new AWS.S3()

  app.get('/api/fileZip/:fragmentId', authBearer, async (req, res) => {
    const archive = archiver('zip')
    const { fragmentId } = req.params

    archive.pipe(res)
    res.attachment(`${fragmentId}-archive.zip`)

    const params = {
      Bucket: s3Config.bucket,
      Prefix: `${fragmentId}`,
    }

    const listObjects = util.promisify(s3.listObjects.bind(s3))
    const getObject = util.promisify(s3.getObject.bind(s3))

    return listObjects(params).then(data => {
      Promise.all(
        data.Contents.map(content =>
          getObject({
            Bucket: s3Config.bucket,
            Key: content.Key,
          }),
        ),
      ).then(files => {
        files.forEach((file, index) => {
          archive.append(file.Body, {
            name: `${_.get(file, 'Metadata.filetype') ||
              'supplementary'}/${_.get(file, 'Metadata.filename') ||
              file.ETag}`,
          })
        })
        archive.finalize()
      })
    })
  })
}

module.exports = FileBackend
