const invitationHelper = require('./Invitation')

module.exports = {
  addAssignedPeople: async (collection, user, role) => {
    collection.assignedPeople = collection.assignedPeople || []
    const matchingInvitation = invitationHelper.getMatchingInvitation(
      user.invitations,
      collection.id,
      role,
    )
    const assignedPerson = {
      id: user.id,
      email: user.email,
      name: `${user.firstName} ${user.lastName}`,
      role,
      hasAnswer: matchingInvitation.hasAnswer,
      isAccepted: matchingInvitation.isAccepted,
    }
    collection.assignedPeople.push(assignedPerson)
    await collection.save()
  },
  removeAssignedPeople: async (collection, email) => {
    const assignedPeople = collection.assignedPeople.filter(
      person => person.email !== email,
    )
    collection.assignedPeople = assignedPeople
    await collection.save()
  },
}
