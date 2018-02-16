import React from 'react'
import { get } from 'lodash'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { Route, Redirect, withRouter } from 'react-router-dom'
import { getCurrentUser } from 'pubsweet-component-xpub-authentication/src/redux/currentUser'

const PrivateRoute = ({
  currentUser,
  getCurrentUser,
  redirectPath = '/',
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      if (!currentUser.isFetched) {
        if (!currentUser.isFetching) {
          getCurrentUser()
        }

        return <div>loading…</div>
      }
      if (!get(currentUser, 'user.admin') || !currentUser.isAuthenticated) {
        return (
          <Redirect
            to={{
              pathname: redirectPath,
              state: { from: props.location },
            }}
          />
        )
      }

      return <Component {...props} />
    }}
  />
)

export default compose(
  withRouter,
  connect(
    state => ({
      currentUser: state.currentUser,
    }),
    {
      getCurrentUser,
    },
  ),
)(PrivateRoute)
