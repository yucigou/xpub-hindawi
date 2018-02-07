import React from 'react'
import classnames from 'classnames'
import { Icon } from '@pubsweet/ui'

import classes from './Spinner.local.scss'

const Spinner = ({ icon = 'loader', size = 16, color = '#444' }) => (
  <div className={classnames(classes.rotate, classes.icon)}>
    <Icon color={color} size={size}>
      {icon}
    </Icon>
  </div>
)

export default Spinner
