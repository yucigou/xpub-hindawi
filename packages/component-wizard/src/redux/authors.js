import { get } from 'lodash'
import { actions } from 'pubsweet-client'
import * as api from 'pubsweet-client/src/helpers/api'

// constants
export const SET_AUTHORS = 'authors/SET_AUTHORS'

// actions
export const setAuthors = (authors, fragmentId) => ({
  type: SET_AUTHORS,
  authors,
  fragmentId,
})

export const addAuthor = (author, collectionId, fragmentId) => dispatch =>
  api
    .create(`/fragments/${fragmentId}/authors`, author)
    .then(() =>
      dispatch(actions.getFragment({ id: collectionId }, { id: fragmentId })),
    )
    .then(({ fragment: { authors, id } }) => dispatch(setAuthors(authors, id)))

// selectors
export const getFragmentAuthors = (state, fragmentId) =>
  get(state, `authors.${fragmentId}`) || []

export default (state = {}, action) => {
  switch (action.type) {
    case SET_AUTHORS:
      return {
        ...state,
        [action.fragmentId]: action.authors,
      }
    default:
      return state
  }
}
