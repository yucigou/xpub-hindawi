import React from 'react'
import { Icon } from '@pubsweet/ui'

const NotFound = ({ history }) => (
  <div style={{ width: '70vw', margin: '0 auto', textAlign: 'center' }}>
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
