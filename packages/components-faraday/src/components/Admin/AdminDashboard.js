import React from 'react'
import { Icon } from '@pubsweet/ui'
import styled from 'styled-components'

const AdminDashboard = ({ history }) => (
  <Root>
    <Title>Admin Dashboard</Title>
    <CardContainer>
      <Card>
        <Icon color="#667080" size={32}>
          edit
        </Icon>
        <span>Journal configuration</span>
      </Card>
      <Card onClick={() => history.push('/admin/users')}>
        <Icon color="#667080" size={32}>
          users
        </Icon>
        <span>Users</span>
      </Card>
      <Card>
        <Icon color="#667080" size={32}>
          settings
        </Icon>
        <span>Roles</span>
      </Card>
    </CardContainer>
  </Root>
)

export default AdminDashboard

// #region Styled components
const Root = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 12px;
`

const Title = styled.span`
  color: #667080;
  font-family: Helvetica;
  font-size: 24px;
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
  border: 1px solid #979797;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 160px;
  margin: 0 25px 25px 0;
  width: 210px;

  &:hover {
    background-color: #ddd;
  }

  > span {
    color: #667080;
    font-family: Helvetica;
    font-size: 18px;
    margin-top: 10px;
    text-align: center;
  }
`
// #endregion
