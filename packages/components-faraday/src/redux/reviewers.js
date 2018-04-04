import { create } from 'pubsweet-client/src/helpers/api'

const initialState = {
  fetching: false,
}

export const inviteReviewer = (email, collectionId) => dispatch => {
  create(`collections/${collectionId}/invitation`, {
    email,
    role: 'reviewer',
  })
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    default:
      return state
  }
}
