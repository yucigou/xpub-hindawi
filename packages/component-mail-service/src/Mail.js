const fs = require('fs')
const handlebars = require('handlebars')
const querystring = require('querystring')
const Email = require('@pubsweet/component-send-email')
const config = require('config')

const resetUrl = config.get('invite-reset-password.url')

module.exports = {
  setupInviteEmail: async (email, emailType, token, comment = '') => {
    let subject
    const htmlFile = readFile(`${__dirname}/templates/${emailType}.html`)
    const textFile = readFile(`${__dirname}/templates/${emailType}.txt`)
    let replacements = {}
    const htmlTemplate = handlebars.compile(htmlFile)
    const textTemplate = handlebars.compile(textFile)

    switch (emailType) {
      case 'invite':
        subject = 'Hindawi Invitation'
        replacements = {
          url: `${resetUrl}?${querystring.encode({
            email,
            token,
          })}`,
        }
        break
      default:
        subject = 'Welcome to Hindawi!'
        break
    }

    const htmlBody = htmlTemplate(replacements)
    const textBody = textTemplate(replacements)

    Email.send(email, subject, textBody, htmlBody)
  },
}

const readFile = path =>
  fs.readFileSync(path, { encoding: 'utf-8' }, (err, file) => {
    if (err) {
      throw err
    } else {
      return file
    }
  })
