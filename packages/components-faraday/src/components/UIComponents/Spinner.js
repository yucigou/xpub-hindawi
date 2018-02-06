import React from 'react'
import classnames from 'classnames'
import { Icon } from '@pubsweet/ui'

import classes from './Spinner.local.scss'

const Spinner = () => (
  <div className={classnames(classes.rotate, classes.icon)}>
    <Icon size={16}>loader</Icon>
  </div>
)

export default Spinner
