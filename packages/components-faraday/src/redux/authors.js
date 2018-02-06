import { get } from 'lodash'
import * as api from 'pubsweet-client/src/helpers/api'

// constants
export const SET_AUTHORS = 'authors/SET_AUTHORS'

// actions
export const addAuthor = (author, collectionId, fragmentId) => dispatch =>
  api
    .create(
      `/collections/${collectionId}/fragments/${fragmentId}/authors`,
      author,
    )
    .then(r => console.log('esposa', r))
// .then(() =>
//   dispatch(actions.getFragment({ id: collectionId }, { id: fragmentId })),
// )
// .then(({ fragment: { authors, id } }) => dispatch(setAuthors(authors, id)))

// selectors

export default (state = {}, action) => {
  switch (action.type) {
    default:
      return state
  }
}
