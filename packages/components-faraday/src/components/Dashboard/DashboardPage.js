import { get } from 'lodash'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actions } from 'pubsweet-client'
import { ConnectPage } from 'xpub-connect'
import { withRouter } from 'react-router-dom'
import { compose, withState, withHandlers, withContext } from 'recompose'
import { newestFirst, selectCurrentUser } from 'xpub-selectors'
import { createDraftSubmission } from 'pubsweet-component-wizard/src/redux/conversion'

import Dashboard from './Dashboard'

import withFilters from './withFilters'

export default compose(
  ConnectPage(() => [
    actions.getCollections(),
    actions.getTeams(),
    actions.getUsers(),
  ]),
  withState('listView', 'changeView', true),
  withState('abstractModal', 'setAbstractModal', null),
  withHandlers({
    changeViewMode: ({ changeView }) => () => changeView(listView => !listView),
    setModal: ({ setAbstractModal }) => (metadata = null) => () => {
      setAbstractModal(metadata)
    },
  }),
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
  withRouter,
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
      abstractModal: PropTypes.object,
      setModal: PropTypes.func,
    },
    ({ abstractModal, setModal }) => ({
      abstractModal,
      setModal,
    }),
  ),
)(Dashboard)
