import { get } from 'lodash'

export const AUTOSAVE_REQUEST = 'autosave/AUTOSAVE_REQUEST'
export const AUTOSAVE_FAILURE = 'autosave/AUTOSAVE_FAILURE'
export const AUTOSAVE_SUCCESS = 'autosave/AUTOSAVE_SUCCESS'

export const autosaveRequest = () => ({
  type: AUTOSAVE_REQUEST,
})

export const autosaveFailure = () => ({
  type: AUTOSAVE_FAILURE,
  error: 'Something went wrong...',
})

export const autosaveSuccess = lastUpdate => ({
  type: AUTOSAVE_SUCCESS,
  lastUpdate,
})

const initialState = {
  isFetching: false,
  lastUpdate: null,
  error: null,
}

export const getAutosave = state => get(state, 'autosave')

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTOSAVE_REQUEST:
      return {
        ...initialState,
        isFetching: true,
      }
    case AUTOSAVE_FAILURE:
      return {
        ...initialState,
        error: action.error,
      }
    case AUTOSAVE_SUCCESS:
      return {
        ...initialState,
        lastUpdate: action.lastUpdate,
      }
    default:
      return state
  }
}
