import { get, create, remove } from 'pubsweet-client/src/helpers/api'

const SET_HANDLING_EDITORS = 'SET_HANDLING_EDITORS'

const setHandlingEditors = editors => ({
  type: SET_HANDLING_EDITORS,
  editors,
})

export const handlingEditors = state => state.editors

export const getHandlingEditors = () => dispatch =>
  get(`/users?handlingEditor=true`).then(res => {
    dispatch(setHandlingEditors(res.users))
  })

export const assignHandlingEditor = (
  email,
  collectionId,
  resend = false,
) => dispatch =>
  create(`/users/invite/${collectionId}`, {
    email,
    role: 'handlingEditor',
    resend,
  })

export const revokeHandlingEditor = (userId, collectionId) => dispatch =>
  remove(`/collections/${collectionId}/users/${userId}?role=handlingEditor`)

export const handlingEditorDecision = (collectionId, accept, reason) =>
  create(`/collections/${collectionId}/users`, {
    type: 'handlingEditor',
    accept,
    reason,
  })

const initialState = []
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_HANDLING_EDITORS:
      return action.editors
    default:
      return state
  }
}
