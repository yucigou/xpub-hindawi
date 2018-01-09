import React from 'react'
import { Route } from 'react-router-dom'

import App from 'pubsweet-component-xpub-app/src/components'

import {
    PrivateRoute,
    LoginPage,
    LogoutPage,
} from 'pubsweet-component-xpub-authentication/src/components'

import DashboardPage from 'pubsweet-component-xpub-dashboard/src/components/DashboardPage'

const Routes = () => (
    <App>
        <Route component={LoginPage} exact path="/login" />
        <PrivateRoute component={DashboardPage} exact path="/" />
        <PrivateRoute component={LogoutPage} exact path="/logout" />
    </App>
)

export default Routes
