import React from 'react'
import { Route } from 'react-router-dom'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import App from 'pubsweet-component-xpub-app/src/components'

import {
  PrivateRoute,
  SignupPage,
  LoginPage,
  LogoutPage,
} from 'pubsweet-component-xpub-authentication/src/components'

import DashboardPage from 'pubsweet-component-xpub-dashboard/src/components/DashboardPage'
import WizardPage from 'pubsweet-component-wizard/src/components/WizardPage'

const ConfirmationPage = () => <h1>Confirmation page</h1>

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
  </App>
)

export default DragDropContext(HTML5Backend)(Routes)
