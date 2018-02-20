import React from 'react'
import { get } from 'lodash'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import { AuthenticatedComponent } from 'pubsweet-client'

const AdminRoute = ({
  currentUser,
  redirectPath = '/',
  component: Component,
  ...rest
}) => {
  const isAdmin = get(currentUser, 'user.admin')
  return (
    <AuthenticatedComponent>
      {isAdmin ? <Component {...rest} /> : <Redirect to="/" />}
    </AuthenticatedComponent>
  )
}

export default compose(
  withRouter,
  connect(state => ({
    currentUser: state.currentUser,
  })),
)(AdminRoute)
