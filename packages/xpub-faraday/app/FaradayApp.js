import React from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { actions } from 'pubsweet-client'
import { withJournal } from 'xpub-journal'
import { AppBar } from 'pubsweet-components-faraday/src/components'

const App = ({ children, currentUser, journal, logoutUser }) => (
  <Root>
    <AppBar
      brand={journal.metadata.name}
      onLogoutClick={logoutUser}
      user={currentUser}
    />
    <MainContainer>{children}</MainContainer>
  </Root>
)

export default compose(
  connect(
    state => ({
      currentUser: state.currentUser.user,
    }),
    { logoutUser: actions.logoutUser },
  ),
  withJournal,
)(App)

const Root = styled.div`
  font-family: ${props => props.theme.fontInterface};
  div[open] {
    width: auto;
  }
`

const MainContainer = styled.div`
  padding: 90px 10px 40px;
  min-height: calc(100vh - 130px);
  background-color: ${props => props.theme.backgroundColor || '#fff'};
`
