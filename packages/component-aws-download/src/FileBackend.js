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
    const getObject = util.promisify(s3.getObject.bind(s3))
    const listObjects = util.promisify(s3.listObjects.bind(s3))

    try {
      archive.pipe(res)
      res.attachment(`${fragmentId}-archive.zip`)

      const params = {
        Bucket: s3Config.bucket,
        Prefix: `${fragmentId}`,
      }

      const s3Items = await listObjects(params)
      const s3Files = await Promise.all(
        s3Items.Contents.map(content =>
          getObject({
            Bucket: s3Config.bucket,
            Key: content.Key,
          }),
        ),
      )

      s3Files.forEach(f => {
        archive.append(f.Body, {
          name: `${_.get(f, 'Metadata.filetype') || 'supplementary'}/${_.get(
            f,
            'Metadata.filename',
          ) || f.ETag}`,
        })
      })

      archive.finalize()
    } catch (err) {
      res.status(err.statusCode).json({ error: err.message })
    }
  })
}

module.exports = FileBackend
