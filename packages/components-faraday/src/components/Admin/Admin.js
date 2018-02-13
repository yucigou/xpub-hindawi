import React from 'react'
import PropTypes from 'prop-types'

import classes from './Admin.local.scss'

const Admin = ({ users }) => (
  <div className={classes.root}>
    <h2>Admin</h2>
    <ul>
      {users.map((u, i) => (
        <li key={i}>
          {u.username} - {u.email}
        </li>
      ))}
    </ul>
  </div>
)

Admin.propTypes = {}

export default Admin
