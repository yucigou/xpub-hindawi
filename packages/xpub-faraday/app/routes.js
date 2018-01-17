import React from 'react'
import { Route } from 'react-router-dom'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import App from 'pubsweet-component-xpub-app/src/components'

import {
  PrivateRoute,
  LoginPage,
  LogoutPage,
} from 'pubsweet-component-xpub-authentication/src/components'

import DashboardPage from 'pubsweet-component-xpub-dashboard/src/components/DashboardPage'

import { WizardPage } from 'pubsweet-component-wizard/src/components'

// import { Wizard } from './component-wizard'

const Routes = () => (
  <App>
    <Route component={LoginPage} exact path="/login" />
    <PrivateRoute component={DashboardPage} exact path="/" />
    <PrivateRoute component={LogoutPage} exact path="/logout" />
    <PrivateRoute
      component={WizardPage}
      exact
      path="/projects/:project/versions/:version/submit"
    />
  </App>
)

export default DragDropContext(HTML5Backend)(Routes)
