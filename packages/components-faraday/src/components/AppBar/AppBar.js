import React from 'react'
import { get } from 'lodash'
import { Icon } from '@pubsweet/ui'
import { connect } from 'react-redux'
import styled, { withTheme } from 'styled-components'
import { withRouter } from 'react-router-dom'
import { withState, withHandlers, compose } from 'recompose'

const AppBar = ({
  expanded,
  toggleMenu,
  brand,
  user,
  goTo,
  currentUser,
  onLogoutClick,
  theme,
}) => (
  <Root>
    <Brand>
      {React.cloneElement(brand, {
        onClick: goTo('/'),
      })}
    </Brand>
    {user && (
      <User>
        <div onClick={toggleMenu}>
          <Icon color={theme.colorText}>user</Icon>
          <span>
            {get(user, 'firstName') || get(user, 'username') || 'User'}
          </span>
          <Icon color={theme.colorText}>chevron-down</Icon>
        </div>
        {expanded && (
          <Dropdown>
            <DropdownOption>Settings</DropdownOption>
            {currentUser.admin && (
              <DropdownOption onClick={goTo('/admin')}>
                Admin dashboard
              </DropdownOption>
            )}
            <DropdownOption onClick={onLogoutClick}>Logout</DropdownOption>
          </Dropdown>
        )}
      </User>
    )}
    {expanded && <ToggleOverlay onClick={toggleMenu} />}
  </Root>
)

// #region styled-components
const Root = styled.div`
  align-items: center;
  box-shadow: ${props => props.theme.dropShadow};
  font-family: ${props => props.theme.fontInterface};
  display: flex;
  justify-content: space-between;
  height: 60px;
  flex-grow: 1;
  position: fixed;
  width: 100%;
  z-index: 10;
  background-color: #ffffff;
`

const Brand = styled.div`
  padding: 10px 20px;
  cursor: pointer;
`

const User = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  height: 60px;
  position: relative;
  padding: 10px 20px;

  > div:first-child {
    align-items: center;
    cursor: pointer;
    display: flex;
  }

  & span {
    color: ${props => props.theme.colorText};
    font-family: ${props => props.theme.fontHeading};
    font-size: ${props => props.theme.fontSizeBase};
    margin-left: 10px;
  }
`

const Dropdown = styled.div`
  background-color: ${props => props.theme.backgroundColor || '#fff'};
  border: ${({ theme }) =>
    `${theme.borderWidth} ${theme.borderStyle} ${theme.colorFurniture}`};
  position: absolute;
  min-width: 150px;
  right: 20px;
  top: 70px;
  z-index: 10;
`

const DropdownOption = styled.div`
  align-items: center;
  color: ${props => props.theme.colorText};
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  height: 34px;
  font-family: ${props => props.theme.fontInterface};
  font-size: ${props => props.theme.fontSizeBaseSmall};
  line-height: ${props => props.theme.fontLineHeight};
  padding: 0 15px;

  &:hover {
    background-color: ${props => props.theme.colorTextReverse || '#d8d8d8'};
  }
`

const ToggleOverlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0;
`
// #endregion

export default compose(
  withRouter,
  withTheme,
  connect(state => ({
    currentUser: get(state, 'currentUser.user'),
  })),
  withState('expanded', 'setExpanded', false),
  withHandlers({
    toggleMenu: ({ setExpanded }) => () => {
      setExpanded(v => !v)
    },
    goTo: ({ setExpanded, history }) => path => () => {
      setExpanded(v => false)
      history.push(path)
    },
  }),
)(AppBar)
