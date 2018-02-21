import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { AuthenticatedComponent } from 'pubsweet-client'
import Login from 'pubsweet-component-login/LoginContainer'
import Signup from 'pubsweet-component-signup/SignupContainer'

import DashboardPage from 'pubsweet-components-faraday/src/components/Dashboard'
import { Wizard } from 'pubsweet-component-wizard/src/components'
import ManuscriptPage from 'pubsweet-component-xpub-manuscript/src/components/ManuscriptPage'
import ConfirmationPage from 'pubsweet-components-faraday/src/components/UIComponents/ConfirmationPage'
import NotFound from 'pubsweet-components-faraday/src/components/UIComponents/NotFound'
import {
  AdminDashboard,
  AdminUsers,
  AdminRoute,
} from 'pubsweet-components-faraday/src/components/Admin'
import AddEditUser from 'pubsweet-components-faraday/src/components/Admin/AddEditUser'
import SignUpInvitationPage from 'pubsweet-components-faraday/src/components/SignUp/SignUpInvitationPage'

import FaradayApp from './FaradayApp'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <AuthenticatedComponent>
        <Component {...props} />
      </AuthenticatedComponent>
    )}
  />
)

const Routes = () => (
  <FaradayApp>
    <Switch>
      <Route component={Login} exact path="/login" />
      <Route component={Signup} exact path="/signup" />
      <PrivateRoute component={DashboardPage} exact path="/" />
      <PrivateRoute
        component={ConfirmationPage}
        exact
        path="/confirmation-page"
      />
      <AdminRoute component={AdminDashboard} exact path="/admin" />
      <AdminRoute component={AdminUsers} exact path="/admin/users" />
      <AdminRoute component={AddEditUser} exact path="/admin/users/add" />
      <AdminRoute
        component={AddEditUser}
        exact
        path="/admin/users/edit/:userId"
      />
      <PrivateRoute
        component={Wizard}
        exact
        path="/projects/:project/versions/:version/submit"
      />
      <PrivateRoute
        component={ManuscriptPage}
        exact
        path="/projects/:project/versions/:version/manuscript"
      />
      <Route component={SignUpInvitationPage} exact path="/invite" />
      <Route component={NotFound} />
    </Switch>
  </FaradayApp>
)

export default Routes
