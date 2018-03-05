const AWS = require('aws-sdk')
// const logger = require('@pubsweet/logger')
const fs = require('fs')
const _ = require('lodash')
const util = require('util')
const config = require('config')
const archiver = require('archiver')

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
    const output = fs.createWriteStream(`${__dirname}/files-output.zip`)
    const params = {
      Bucket: s3Config.bucket,
      Prefix: `${req.params.fragmentId}`,
    }

    const listObjects = util.promisify(s3.listObjects.bind(s3))
    const getObject = util.promisify(s3.getObject.bind(s3))

    const archive = archiver('zip')
    archive.pipe(output)

    return listObjects(params).then(data => {
      Promise.all(
        data.Contents.map(content =>
          getObject({
            Bucket: s3Config.bucket,
            Key: content.Key,
          }),
        ),
      ).then(values => {
        values.forEach((v, index) => {
          archive.append(v.Body, { name: v.ETag })
        })

        archive.finalize().then(() => {
          res.writeHead(200, {
            'Content-Type': 'application/octet-stream',
            'Content-Disposition': `attachment; filename=files-output.zip`,
          })
          const readStream = fs.createReadStream(output.path)
          readStream.pipe(res)
          // res.download(output.path)
        })
      })
    })
  })
}

module.exports = FileBackend
