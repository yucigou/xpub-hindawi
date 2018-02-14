import React from 'react'
import { Icon } from '@pubsweet/ui'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { withState, withHandlers, compose } from 'recompose'

const AppBar = ({ expanded, toggleMenu, brand, user, goTo }) => (
  <Root>
    {brand}
    {user && (
      <User>
        <div onClick={toggleMenu}>
          <Icon color="#667080">user</Icon>
          <span>{user.username}</span>
          <Icon color="#667080">chevron-down</Icon>
        </div>
        {expanded && (
          <Dropdown>
            <DropdownOption>Settings</DropdownOption>
            <DropdownOption onClick={goTo('admin')}>
              Admin dashboard
            </DropdownOption>
            <DropdownOption>Logout</DropdownOption>
          </Dropdown>
        )}
      </User>
    )}
  </Root>
)

const Root = styled.div`
  align-items: center;
  box-shadow: 0 1px 0 0 #667080;
  display: flex;
  justify-content: space-between;
  height: 60px;
  padding: 10px 20px;
`

const User = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  height: 80px;
  position: relative;

  > div:first-child {
    align-items: center;
    cursor: pointer;
    display: flex;
  }

  & span {
    color: #667080;
    font-family: Helvetica;
    font-size: 16px;
    margin-left: 10px;
  }
`

const Dropdown = styled.div`
  background-color: #fff;
  border: 1px solid #667080;
  position: absolute;
  min-width: 150px;
  right: 0;
  top: 80px;
  z-index: 10;
`

const DropdownOption = styled.div`
  align-items: center;
  color: #667080;
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  height: 34px;
  font-family: Helvetica;
  font-size: 14px;
  line-height: 2.43;
  padding-left: 15px;

  &:hover {
    background-color: #d8d8d8;
  }
`

export default compose(
  withRouter,
  withState('expanded', 'setExpanded', false),
  withHandlers({
    toggleMenu: ({ setExpanded }) => () => {
      setExpanded(v => !v)
    },
    goTo: ({ setExpanded, history }) => path => () => {
      history.push(path)
      setExpanded(v => false)
    },
  }),
)(AppBar)
