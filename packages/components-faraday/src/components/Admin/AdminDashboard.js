import React from 'react'
import { Icon } from '@pubsweet/ui'
import styled, { withTheme } from 'styled-components'

const AdminDashboard = ({ history, theme }) => (
  <Root>
    <Title>Admin Dashboard</Title>
    <CardContainer>
      <Card>
        <Icon color={theme.colorPrimary} size={6}>
          edit
        </Icon>
        <span>Journal configuration</span>
      </Card>
      <Card onClick={() => history.push('/admin/users')}>
        <Icon color={theme.colorPrimary} size={6}>
          users
        </Icon>
        <span>Users</span>
      </Card>
      <Card>
        <Icon color={theme.colorPrimary} size={6}>
          settings
        </Icon>
        <span>Roles</span>
      </Card>
    </CardContainer>
  </Root>
)

export default withTheme(AdminDashboard)

// #region Styled components
const Root = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 12px;
`

const Title = styled.span`
  color: ${({ theme }) => theme.colorPrimary};
  font-family: ${({ theme }) => theme.fontInterface};
  font-size: ${({ theme }) => theme.fontSizeHeading5};
  font-weight: bold;
  text-align: left;
`

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 24px;
`

const Card = styled.div`
  align-items: center;
  border: ${({ theme }) => theme.borderDefault};
  background-color: ${({ theme }) => theme.backgroundColorReverse};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 160px;
  margin: 0 25px 25px 0;
  width: 210px;

  &:hover {
    background-color: ${({ theme }) => theme.backgroundColor};
  }

  > span {
    color: ${({ theme }) => theme.colorPrimary};
    font-family: ${({ theme }) => theme.fontInterface};
    font-size: 18px;
    margin-top: 10px;
    text-align: center;
  }
`
// #endregion
