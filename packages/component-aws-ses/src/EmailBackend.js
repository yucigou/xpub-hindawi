const nodemailer = require('nodemailer')
const config = require('config')
const logger = require('@pubsweet/logger')
const AWS = require('aws-sdk')

const mailerConfig = config.get('mailer')

module.exports = {
  sendEmail: (toEmail, subject, textBody, htmlBody) => {
    const transporter = nodemailer.createTransport({
      SES: new AWS.SES({
        secretAccessKey: process.env.AWS_SES_SECRET_KEY,
        accessKeyId: process.env.AWS_SES_ACCESS_KEY,
        region: process.env.AWS_SES_REGION,
      }),
    })
    transporter.sendMail(
      {
        from: mailerConfig.from,
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
