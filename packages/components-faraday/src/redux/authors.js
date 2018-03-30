import { get } from 'lodash'
import { create, get as apiGet, remove } from 'pubsweet-client/src/helpers/api'

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

export const addAuthor = (author, collectionId) => dispatch => {
  dispatch(authorRequest())
  return create(`/users/invite/${collectionId}`, {
    email: author.email,
    role: 'author',
    ...author,
  })
}

export const deleteAuthor = (collectionId, userId) => dispatch =>
  remove(`/collections/${collectionId}/users/${userId}?role=author`)
// Promise.resolve(author)

export const getAuthors = collectionId =>
  apiGet(`/collections/${collectionId}/users?role=author`)

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
