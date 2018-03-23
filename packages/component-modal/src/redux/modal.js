const initialState = {
  props: {},
}

const SHOW_MODAL = 'modal/SHOW_MODAL'
const HIDE_MODAL = 'modal/HIDE_MODAL'

export const showModal = (modalKey, props = {}) => ({
  type: SHOW_MODAL,
  payload: {
    modalKey,
    props,
  },
})

export const hideModal = () => ({
  type: HIDE_MODAL,
})

export const getModalVisibility = (state, modalKey) => state[modalKey]

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        [action.payload.modalKey]: true,
        props: action.payload.props,
      }
    case HIDE_MODAL:
      return initialState
    default:
      return state
  }
}
