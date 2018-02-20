const initialState = {
  visible: false,
  props: {},
}

const SET_MODAL_VISIBILTY = 'modal/SET_MODAL_VISIBILTY'

export const setModalVisibility = (visible, props = {}) => ({
  type: SET_MODAL_VISIBILTY,
  payload: {
    visible,
    props,
  },
})

export default (state = initialState, action = {}) => {
  switch (action.type) {
    default:
      return state
  }
}
