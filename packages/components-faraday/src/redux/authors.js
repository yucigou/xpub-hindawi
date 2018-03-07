import { get } from 'lodash'
import * as api from 'pubsweet-client/src/helpers/api'

// constants
const REQUEST = 'authors/REQUEST'
const FAILURE = 'authors/FAILURE'
const SUCCESS = 'authors/SUCCESS'

// actions
export const authorRequest = () => ({
  type: REQUEST,
})

export const authorFaiure = error => ({
  type: FAILURE,
  error,
})

export const authorSuccess = () => ({
  type: SUCCESS,
})

export const addAuthor = (author, collectionId, fragmentId) => dispatch => {
  dispatch(authorRequest())
  return api
    .create(
      `/collections/${collectionId}/fragments/${fragmentId}/authors`,
      author,
    )
    .then(author => {
      dispatch(authorSuccess())
      return author
    })
    .catch(err => dispatch(authorFaiure(err)))
}

// selectors
export const getFragmentAuthors = (state, fragmentId) =>
  get(state, `authors.${fragmentId}`) || []

export const getAuthorFetching = state => state.authors.isFetching
export const getAuthorError = state => state.authors.error

const initialState = { isFetching: false, error: null }

export default (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_FRAGMENT_REQUEST':
    case REQUEST:
      return {
        ...initialState,
        isFetching: true,
      }
    case 'UPDATE_FRAGMENT_FAILURE':
    case FAILURE:
      return {
        ...initialState,
        error: action.error,
        isFetching: false,
      }
    case 'UPDATE_FRAGMENT_SUCCESS':
    case SUCCESS:
      return initialState
    default:
      return state
  }
}
