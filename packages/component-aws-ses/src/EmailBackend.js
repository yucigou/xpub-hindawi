const nodemailer = require('nodemailer')
const bodyParser = require('body-parser')
const AWS = require('aws-sdk')
const config = require('config')
const _ = require('lodash')
const logger = require('@pubsweet/logger')

const sesConfig = _.get(config, 'pubsweet-component-aws-ses')

const EmailBackend = app => {
  app.use(bodyParser.json())
  const authBearer = app.locals.passport.authenticate('bearer', {
    session: false,
  })
  app.post('/api/email', authBearer, async (req, res) => {
    AWS.config.update({
      secretAccessKey: sesConfig.secretAccessKey,
      accessKeyId: sesConfig.accessKeyId,
      region: sesConfig.region,
    })

    const { email, subject, textBody, htmlBody } = req.body
    if (
      email === undefined ||
      subject === undefined ||
      textBody === undefined ||
      htmlBody === undefined
    ) {
      res.status(400).json({ error: 'all parameters are required' })
      logger.error('some parameters are missing')
      return
    }
    const transporter = nodemailer.createTransport({
      SES: new AWS.SES(),
    })
    transporter.sendMail(
      {
        from: sesConfig.sender,
        to: email,
        subject,
        text: textBody,
        html: htmlBody,
      },
      (err, info) => {
        if (err) {
          logger.error(err)
        }
        logger.debug(info)
      },
    )
    res.status(204).json()
  })
}

module.exports = EmailBackend
