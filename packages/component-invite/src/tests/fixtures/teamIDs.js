const Chance = require('chance')

const chance = new Chance()

const teamIDs = {
  heTeam: chance.guid(),
  reviewerTeam: chance.guid(),
}

module.exports = { teamIDs }
