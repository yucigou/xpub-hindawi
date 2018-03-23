import { get, create } from 'pubsweet-client/src/helpers/api'

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

export const assignHandlingEditor = (email, collectionId) => dispatch =>
  create(`/users/invite/${collectionId}`, {
    email,
    role: 'handlingEditor',
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
