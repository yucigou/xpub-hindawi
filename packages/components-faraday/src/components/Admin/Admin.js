import React from 'react'
import styled from 'styled-components'
import { Icon, Menu } from '@pubsweet/ui'

import { Pagination } from './'

const AddButton = styled.button`
  align-items: center;
  border: none;
  cursor: pointer;
  display: flex;
  font-family: Helvetica;
  font-size: 12px;
  text-align: left;
  color: #667080;

  &:active,
  &:focus {
    outline: none;
  }
`

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  & span {
    font-family: Helvetica;
    font-size: 24px;
    font-weight: bold;
    text-align: left;
    color: #667080;
  }
`

const SubHeader = styled.div`
  align-items: center;
  border-bottom: 1px solid #667080;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
  padding-bottom: 10px;

  > div:first-child {
    display: flex;
    align-items: center;
  }

  span {
    font-family: Helvetica;
    font-size: 14px;
    text-align: left;
    color: #667080;
  }
`

const Table = styled.table`
  border-spacing: 0;
  border-collapse: collapse;
  margin-top: 10px;
  width: 100vw;

  & thead tr {
    height: 40px;
    border-bottom: 1px solid #667080;
    font-family: Helvetica;
    font-size: 14px;
    font-weight: bold;
    text-align: left;
    color: #667080;
  }
`

const Row = styled.tr`
  border-bottom: 1px solid #667080;
  color: #667080;
  font-family: Helvetica;
  font-size: 14px;
  height: 40px;
  text-align: left;
`

const Status = styled.td`
  & span {
    border: solid 1px #667080;
    text-transform: uppercase;
    font-family: Helvetica;
    font-size: 12px;
    font-weight: bold;
    text-align: left;
    color: #667080;
    padding: 2px 10px;
  }
`

const Input = styled.input`
  height: 20px;
  width: 20px;
`

const TableRow = ({ toggleUser, selected, email, username, type }) => (
  <Row>
    <td>
      <Input checked={selected} onClick={toggleUser} type="checkbox" />
    </td>
    <td>{email}</td>
    <td>{username}</td>
    <td>affiliation here</td>
    <td>country here</td>
    <td>{type}</td>
    <Status>
      <span>status</span>
    </Status>
  </Row>
)

const Admin = ({
  users,
  toggleUser,
  toggleAllUsers,
  incrementPage,
  decrementPage,
  page,
  itemsPerPage,
}) => (
  <div>
    <Header>
      <span>Users</span>
      <AddButton>
        <Icon color="#667080">plus-circle</Icon>
        Add User
      </AddButton>
    </Header>
    <SubHeader>
      <div>
        <span>Bulk actions: </span>
        <Menu
          onChange={value => value}
          options={[
            { value: 'deactivate', label: 'Deactivate' },
            { value: 'activate', label: 'Activate' },
          ]}
          value="activate"
        />

        <Menu
          onChange={value => value}
          options={[
            { value: 'sort', label: 'SORT' },
            { value: 'unsort', label: 'UNSORT' },
          ]}
          value="sort"
        />

        <Icon color="#667080" size={24}>
          search
        </Icon>
      </div>
      <Pagination
        decrementPage={decrementPage}
        incrementPage={incrementPage}
        itemsPerPage={itemsPerPage}
        page={page}
      />
    </SubHeader>

    <Table>
      <thead>
        <tr>
          <td>
            <Input
              checked={users.every(u => u.selected)}
              onClick={toggleAllUsers}
              type="checkbox"
            />
          </td>
          <td>Email</td>
          <td>Full name</td>
          <td>Affiliation</td>
          <td>Country</td>
          <td>Roles</td>
          <td>Status</td>
        </tr>
      </thead>
      <tbody>
        {users.map(u => (
          <TableRow key={u.id} {...u} toggleUser={toggleUser(u)} />
        ))}
      </tbody>
    </Table>
  </div>
)

export default Admin
