const Chance = require('chance')

const chance = new Chance()
const heID = chance.guid()
const revID = chance.guid()

module.exports = {
  heTeamID: heID,
  reviewerTeamID: revID,
}
