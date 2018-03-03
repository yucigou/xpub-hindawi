const nodemailer = require('nodemailer')
const logger = require('@pubsweet/logger')
const config = require('config')

const mailerConfig = require(config.mailer.path)
module.exports = {
  send: (toEmail, subject, textBody, htmlBody) => {
    const transporter = nodemailer.createTransport(mailerConfig.transport)
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
