import React from 'react'
import { get } from 'lodash'
import { connect } from 'react-redux'
import { Icon, th } from '@pubsweet/ui'
import { withRouter } from 'react-router-dom'
import styled, { withTheme } from 'styled-components'
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
  box-shadow: ${th('dropShadow')};
  font-family: ${th('fontInterface')};
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
    color: ${th('colorText')};
    font-family: ${th('fontHeading')};
    font-size: ${th('fontSizeBase')};
    margin-left: 10px;
  }
`

const Dropdown = styled.div`
  background-color: ${th('colorBackground')};
  border: ${th('borderWidth')} ${th('borderStyle')} ${th('colorBorder')};
  position: absolute;
  right: 20px;
  top: 60px;
  width: calc(${th('gridUnit')} * 8);
  z-index: 10;
`

const DropdownOption = styled.div`
  align-items: center;
  color: ${th('colorText')};
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  height: calc(${th('gridUnit')} * 2);
  font-family: ${th('fontInterface')};
  font-size: ${th('fontSizeBase')};
  line-height: ${th('fontLineHeight')};
  padding: 0 15px;

  &:hover {
    background-color: ${th('backgroundColor')};
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
