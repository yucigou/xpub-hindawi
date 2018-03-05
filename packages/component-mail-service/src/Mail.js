const fs = require('fs')
const handlebars = require('handlebars')
const querystring = require('querystring')
const Email = require('@pubsweet/component-send-email')
const config = require('config')

const resetPath = config.get('invite-reset-password.url')

module.exports = {
  setupInviteEmail: async (email, emailType, token, inviteUrl) => {
    let subject
    let replacements = {}
    switch (emailType) {
      case 'invite':
        subject = 'Hindawi Invitation'
        replacements = {
          url: `${inviteUrl}${resetPath}?${querystring.encode({
            email,
            token,
          })}`,
        }
        break
      default:
        subject = 'Welcome to Hindawi!'
        break
    }

    const { htmlBody, textBody } = getEmailBody(emailType, replacements)

    await Email.send(email, subject, textBody, htmlBody)
  },
  setupAssignEmail: async (email, emailType, dashBoardUrl) => {
    let subject
    let replacements = {}
    switch (emailType) {
      case 'assign-handling-editor':
        subject = 'Hindawi Handling Editor Invitation'
        replacements = {
          url: dashBoardUrl,
        }
        break
      default:
        subject = 'Welcome to Hindawi!'
        break
    }

    const { htmlBody, textBody } = getEmailBody(emailType, replacements)

    Email.send(email, subject, textBody, htmlBody)
  },
}

const getEmailBody = (emailType, replacements) => {
  const htmlFile = readFile(`${__dirname}/templates/${emailType}.html`)
  const textFile = readFile(`${__dirname}/templates/${emailType}.txt`)
  const htmlTemplate = handlebars.compile(htmlFile)
  const textTemplate = handlebars.compile(textFile)
  const htmlBody = htmlTemplate(replacements)
  const textBody = textTemplate(replacements)
  return { htmlBody, textBody }
}

const readFile = path =>
  fs.readFileSync(path, { encoding: 'utf-8' }, (err, file) => {
    if (err) {
      throw err
    } else {
      return file
    }
  })
