import React from 'react'
import { Route } from 'react-router-dom'

import App from 'pubsweet-component-xpub-app/src/components'

import {
  PrivateRoute,
  SignupPage,
  LoginPage,
  LogoutPage,
} from 'pubsweet-component-xpub-authentication/src/components'

import DashboardPage from 'pubsweet-component-xpub-dashboard/src/components/DashboardPage'
import WizardPage from 'pubsweet-component-wizard/src/components/WizardPage'
import ManuscriptPage from 'pubsweet-component-xpub-manuscript/src/components/ManuscriptPage'
import ConfirmationPage from 'pubsweet-components-faraday/src/components/UIComponents/ConfirmationPage'

const Routes = () => (
  <App>
    <Route component={LoginPage} exact path="/login" />
    <Route component={SignupPage} exact path="/signup" />
    <PrivateRoute component={DashboardPage} exact path="/" />
    <PrivateRoute
      component={ConfirmationPage}
      exact
      path="/confirmation-page"
    />
    <PrivateRoute component={LogoutPage} exact path="/logout" />
    <PrivateRoute
      component={WizardPage}
      exact
      path="/projects/:project/versions/:version/submit"
    />
    <PrivateRoute
      component={ManuscriptPage}
      exact
      path="/projects/:project/versions/:version/manuscript"
    />
  </App>
)

export default Routes
