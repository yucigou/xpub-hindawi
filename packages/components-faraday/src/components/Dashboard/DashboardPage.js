import { compose, withState, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from 'pubsweet-client'
import { newestFirst, selectCurrentUser } from 'xpub-selectors'
import { ConnectPage } from 'xpub-connect'
import { createDraftSubmission } from 'pubsweet-component-wizard/src/redux/conversion'

import Dashboard from './Dashboard'

export default compose(
  ConnectPage(() => [
    actions.getCollections(),
    actions.getTeams(),
    actions.getUsers(),
  ]),
  withState('listView', 'changeView', true),
  withHandlers({
    changeViewMode: ({ changeView }) => () => changeView(listView => !listView),
  }),
  connect(
    state => {
      const { collections } = state
      const { conversion } = state
      const currentUser = selectCurrentUser(state)

      const sortedCollections = newestFirst(collections)

      const dashboard = {
        owner: sortedCollections.filter(
          collection =>
            collection.owners &&
            collection.owners.some(owner => owner.id === currentUser.id),
        ),
        reviewer: sortedCollections.filter(
          collection =>
            collection.reviewers &&
            collection.reviewers.some(
              reviewer => reviewer && reviewer.user === currentUser.id,
            ),
        ),
      }

      return { collections, conversion, currentUser, dashboard }
    },
    (dispatch, { history }) => ({
      deleteProject: collection =>
        dispatch(actions.deleteCollection(collection)),
      createDraftSubmission: () => dispatch(createDraftSubmission(history)),
    }),
  ),
  withRouter,
)(Dashboard)
