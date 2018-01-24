import React from 'react'
import { Icon } from '@pubsweet/ui'
import classnames from 'classnames'

import classes from './UIComponents.local.scss'

const NotFound = ({ history }) => (
  <div className={classnames(classes.container)}>
    <div>
      <Icon size={32}>cloud-off</Icon>
    </div>
    <h2>The page cannot be found</h2>
    <h3>
      The page you are looking for might have been removed, had its name
      changed, or is temporarily unavailable.
    </h3>
    <a href="#" onClick={history.goBack}>
      Back
    </a>
  </div>
)

export default NotFound
