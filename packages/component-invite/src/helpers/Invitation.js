const revokeInvitation = async (user, collectionId, type) => {
  const filteredInvitations = user.invitations.filter(
    invitation =>
      invitation.collectionId !== collectionId && invitation.type !== type,
  )

  user.invitations = filteredInvitations
  await user.save()
}

const getInviteData = (invitations, collectionId, role) => {
  const matchingInvitation = invitations.find(
    invite => invite.type === role && invite.collectionId === collectionId,
  )
  let status = 'pending'
  if (matchingInvitation.isAccepted) {
    status = 'accepted'
  } else if (matchingInvitation.hasAnswer) {
    status = 'refused'
  }

  const { timestamp } = matchingInvitation
  return { timestamp, status }
}

const setupInvitation = async (user, role, collectionId, teamId) => {
  const invitation = {
    type: role,
    hasAnswer: false,
    isAccepted: false,
    collectionId,
    timestamp: Date.now(),
    teamId,
  }
  user.invitations = user.invitations || []
  user.invitations.push(invitation)
  user = await user.save()
  return user
}

const getMatchingInvitation = (invitations, collectionId, role) =>
  invitations.find(
    invite => invite.type === role && invite.collectionId === collectionId,
  )

module.exports = {
  getInviteData,
  revokeInvitation,
  setupInvitation,
  getMatchingInvitation,
}
