require('dotenv').config()
const path = require('path')
const components = require('./components.json')
const logger = require('winston')

// const environment = process.env.NODE_ENV || 'development'

const getDbConfig = () => {
  if (process.env.DATABASE) {
    return {
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DATABASE,
      host: process.env.DB_HOST,
      port: 5432,
      ssl: true,
    }
  }
  return {}
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
    db: getDbConfig(),
    port: 3000,
    logger,
    uploads: 'uploads',
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
    url: process.env.PUBSWEET_INVITE_PASSWORD_RESET_URL || '/invite',
  },
  roles: {
    global: ['admin', 'editorInChief', 'author', 'handlingEditor'],
    collection: ['handlingEditor', 'reviewer'],
    inviteRights: {
      admin: ['admin', 'editorInChief', 'author', 'handlingEditor'],
      editorInChief: ['handlingEditor'],
      handlingEditor: ['reviewer'],
    },
  },
  mailer: {
    from: 'sebastian.mihalache@thinslices.com',
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
