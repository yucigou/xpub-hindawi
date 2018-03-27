import { get } from 'lodash'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actions } from 'pubsweet-client'
import { withJournal } from 'xpub-journal'
import { ConnectPage } from 'xpub-connect'
import { withRouter } from 'react-router-dom'
import { compose, withContext } from 'recompose'
import { newestFirst, selectCurrentUser } from 'xpub-selectors'
import { createDraftSubmission } from 'pubsweet-component-wizard/src/redux/conversion'

import Dashboard from './Dashboard'
import withFilters from './withFilters'
import { getHandlingEditors } from '../../redux/editors'

export default compose(
  ConnectPage(() => [actions.getCollections()]),
  connect(
    state => {
      const { collections, conversion } = state
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
        all: sortedCollections,
      }
      return { collections, conversion, currentUser, dashboard }
    },
    (dispatch, { history }) => ({
      deleteProject: collection =>
        dispatch(actions.deleteCollection(collection)),
      createDraftSubmission: () => dispatch(createDraftSubmission(history)),
    }),
  ),
  ConnectPage(
    ({ currentUser }) =>
      get(currentUser, 'admin') || get(currentUser, 'editorInChief')
        ? [getHandlingEditors()]
        : [],
  ),
  withRouter,
  withJournal,
  withFilters({
    status: {
      options: [
        { label: 'All', value: 'all' },
        { label: 'Submitted', value: 'submitted' },
        { label: 'Draft', value: 'draft' },
      ],
      filterFn: filterValue => item => {
        if (filterValue === 'all' || filterValue === '') return true
        const itemStatus = get(item, 'status')
        if (!itemStatus && filterValue === 'draft') {
          return true
        }
        return itemStatus === filterValue
      },
    },
    owner: {
      options: [
        { label: 'Everyone', value: 'all' },
        { label: 'My work', value: 'me' },
        { label: `Other's work`, value: 'other' },
      ],
      filterFn: (filterValue, { currentUser }) => item => {
        if (filterValue === 'all' || filterValue === '') return true
        const itemOwnerIds = item.owners.map(o => o.id)
        if (filterValue === 'me') {
          return itemOwnerIds.includes(currentUser.id)
        } else if (filterValue === 'other') {
          return !itemOwnerIds.includes(currentUser.id)
        }
        return false
      },
    },
  }),
  withContext(
    {
      journal: PropTypes.object,
      currentUser: PropTypes.object,
    },
    ({ journal, currentUser }) => ({ journal, currentUser }),
  ),
)(Dashboard)
