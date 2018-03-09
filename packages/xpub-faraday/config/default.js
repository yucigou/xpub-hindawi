require('dotenv').config()

const path = require('path')
const components = require('./components.json')
const logger = require('winston')

const environment = process.env.NODE_ENV || 'development'
const getInviteUrl = () => {
  if (process.env.PUBSWEET_INVITE_PASSWORD_RESET_URL) {
    return process.env.PUBSWEET_INVITE_PASSWORD_RESET_URL
  } else if (process.env.NOW_URL) {
    return `${process.env.NOW_URL}/invite`
  }
  return 'http://localhost:3000/invite'
}

module.exports = {
  authsome: {
    mode: path.resolve(__dirname, 'authsome.js'),
    teams: {
      // TODO
    },
  },
  validations: path.resolve(__dirname, 'validations.js'),
  pubsweet: {
    components,
  },
  'pubsweet-server': {
    dbPath:
      process.env.PUBSWEET_DB ||
      path.join(__dirname, '..', 'api', 'db', environment),
    logger,
  },
  'pubsweet-client': {
    API_ENDPOINT: '/api',
    'login-redirect': '/',
    'redux-log': true,
    theme: process.env.PUBSWEET_THEME,
  },
  'mail-transport': {
    sendmail: true,
  },
  'password-reset': {
    url:
      process.env.PUBSWEET_PASSWORD_RESET_URL ||
      'http://localhost:3000/password-reset',
    sender: process.env.PUBSWEET_PASSWORD_RESET_SENDER || 'dev@example.com',
  },
  'pubsweet-component-aws-s3': {
    secretAccessKey: process.env.AWS_S3_SECRET_KEY,
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    region: process.env.AWS_S3_REGION,
    bucket: process.env.AWS_S3_BUCKET,
    validations: path.resolve(__dirname, 'upload-validations.js'),
  },
  'invite-reset-password': {
    url: getInviteUrl(),
  },
  roles: {
    global: ['admin', 'editorInChief', 'author'],
    collection: ['handlingEditor', 'reviewer'],
    inviteRights: {
      admin: ['admin', 'editorInChief', 'author'],
      editorInChief: ['handlingEditor'],
      handlingEditor: ['reviewer'],
    },
  },
  mailer: {
    from: process.env.EMAIL_SENDER || 'test_sender@domain.com',
    path: `${__dirname}/mailer`,
  },
  publicKeys: [
    'pubsweet-client',
    'authsome',
    'validations',
    'pubsweet-component-aws-s3',
    'pubsweet-component-aws-ses',
  ],
}
