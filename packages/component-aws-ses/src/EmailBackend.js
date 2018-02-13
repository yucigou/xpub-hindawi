const nodemailer = require('nodemailer')
const AWS = require('aws-sdk')
const config = require('config')
const _ = require('lodash')
const logger = require('@pubsweet/logger')

const sesConfig = _.get(config, 'pubsweet-component-aws-ses')

module.exports = {
  sendEmail: (toEmail, subject, textBody, htmlBody) => {
    AWS.config.update({
      secretAccessKey: sesConfig.secretAccessKey,
      accessKeyId: sesConfig.accessKeyId,
      region: sesConfig.region,
    })

    const transporter = nodemailer.createTransport({
      SES: new AWS.SES(),
    })
    transporter.sendMail(
      {
        from: sesConfig.sender,
        to: toEmail,
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
  },
}
