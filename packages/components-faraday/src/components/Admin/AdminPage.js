import { get } from 'lodash'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { actions } from 'pubsweet-client'
import { ConnectPage } from 'xpub-connect'
import { withRouter } from 'react-router-dom'

import Admin from './Admin'

export default compose(
  ConnectPage(() => [actions.getUsers()]),
  withRouter,
  connect(state => ({ users: get(state, 'users.users') })),
)(Admin)
