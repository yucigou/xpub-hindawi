import React from 'react'
import styled from 'styled-components'

const Admin = ({ users = [] }) => (
  <Root>
    <h2>Admin</h2>
    <ul>
      {users.map((u, i) => (
        <li key={u.id}>
          {u.username} - {u.email}
        </li>
      ))}
    </ul>
  </Root>
)

export default Admin

const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 60em;
`
