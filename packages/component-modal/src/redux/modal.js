const initialState = {
  error: null,
  props: {},
}

const SHOW_MODAL = 'modal/SHOW_MODAL'
const SET_MODAL_ERROR = 'modal/SET_MODAL_ERROR'
const HIDE_MODAL = 'modal/HIDE_MODAL'

export const showModal = (modalKey, props = {}) => ({
  type: SHOW_MODAL,
  payload: {
    modalKey,
    props,
  },
})

export const setModalError = error => ({
  type: SET_MODAL_ERROR,
  payload: {
    error,
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
        error: null,
        props: action.payload.props,
      }
    case SET_MODAL_ERROR:
      return {
        ...state,
        error: action.payload.error,
      }
    case HIDE_MODAL:
      return initialState
    default:
      return state
  }
}
