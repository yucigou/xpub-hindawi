import { get } from 'lodash'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { actions } from 'pubsweet-client'
import { ConnectPage } from 'xpub-connect'
import { withRouter } from 'react-router-dom'
import { compose, withState, withHandlers } from 'recompose'

import Admin from './Admin'

export default compose(
  ConnectPage(() => [actions.getUsers()]),
  withRouter,
  connect(state => ({ currentUsers: get(state, 'users.users') })),
  withState('users', 'setUsers', props =>
    props.currentUsers.map(u => ({ ...u, selected: false })),
  ),
  withState('itemsPerPage', 'setItemsPerPage', 50),
  withState('page', 'setPage', 0),
  withHandlers({
    incrementPage: ({ setPage }) => () => {
      setPage(p => p + 1)
    },
    decrementPage: ({ setPage }) => () => {
      setPage(p => (p > 0 ? p - 1 : p))
    },
    toggleUser: ({ setUsers }) => user => () => {
      setUsers(prev =>
        prev.map(u => (u.id === user.id ? { ...u, selected: !u.selected } : u)),
      )
    },
    toggleAllUsers: ({ setUsers }) => () => {
      setUsers(users => users.map(u => ({ ...u, selected: !u.selected })))
    },
  }),
)(Admin)
