import { get } from 'lodash'
import { actions } from 'pubsweet-client'
import * as api from 'pubsweet-client/src/helpers/api'
import { change } from 'redux-form'

// constants
export const SET_AUTHORS = 'authors/SET_AUTHORS'

const _setAuthors = (authors, fragmentId) => ({
  type: SET_AUTHORS,
  authors,
  fragmentId,
})

// actions
export const setAuthors = (authors, fragmentId) => dispatch => {
  dispatch(_setAuthors(authors, fragmentId))
  dispatch(change('wizard', 'authors', authors))
}

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
