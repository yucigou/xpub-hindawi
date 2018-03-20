module.exports = {
  mailer: {
    from: 'test@example.com',
  },
  'invite-reset-password': {
    url:
      process.env.PUBSWEET_INVITE_PASSWORD_RESET_URL ||
      'http://localhost:3000/invite',
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
}
