import { pick } from 'lodash'
import moment from 'moment'
import { actions } from 'pubsweet-client'

/* constants */
export const CREATE_DRAFT_REQUEST = 'CREATE_DRAFT_REQUEST'
export const CREATE_DRAFT_SUCCESS = 'CREATE_DRAFT_SUCCESS'

/* action creators */
export const createDraftRequest = () => ({
  type: CREATE_DRAFT_REQUEST,
})

export const createDraftSuccess = draft => ({
  type: CREATE_DRAFT_SUCCESS,
  draft,
})

/* utils */
const generateCustomId = () =>
  moment
    .now()
    .toString()
    .slice(-7)

/* actions */
export const createDraftSubmission = history => (dispatch, getState) => {
  const currentUser = getState().currentUser.user
  let authors = []
  if (!currentUser.admin) {
    authors = [
      {
        ...pick(currentUser, [
          'affiliation',
          'email',
          'firstName',
          'lastName',
          'middleName',
          'country',
        ]),
        isSubmitting: true,
        isCorresponding: true,
      },
    ]
  }

  return dispatch(
    actions.createCollection({ customId: generateCustomId() }),
  ).then(({ collection }) => {
    if (!collection.id) {
      throw new Error('Failed to create a project')
    }

    // TODO: rethrow errors so they can be caught here
    return dispatch(
      actions.createFragment(collection, {
        created: new Date(), // TODO: set on server
        files: {
          supplementary: [],
        },
        authors,
        fragmentType: 'version',
        metadata: {},
        version: 1,
      }),
    ).then(({ fragment }) => {
      const route = `/projects/${collection.id}/versions/${fragment.id}/submit`

      // redirect after a short delay
      window.setTimeout(() => {
        history.push(route)
      }, 10)
    })
  })
}

/* reducer */
const initialState = {
  complete: undefined,
  converting: false,
  error: undefined,
}

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}
