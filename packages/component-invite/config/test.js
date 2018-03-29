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
    collection: ['handlingEditor', 'reviewer', 'author'],
    inviteRights: {
      admin: ['admin', 'editorInChief', 'author', 'handlingEditor', 'author'],
      editorInChief: ['handlingEditor'],
      handlingEditor: ['reviewer'],
      author: ['author'],
    },
  },
}
