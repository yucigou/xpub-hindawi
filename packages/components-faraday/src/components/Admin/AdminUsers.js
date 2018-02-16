import React from 'react'
import { get } from 'lodash'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Icon, Menu } from '@pubsweet/ui'
import { actions } from 'pubsweet-client'
import { ConnectPage } from 'xpub-connect'
import { withJournal } from 'xpub-journal'
import { withRouter } from 'react-router-dom'
import { compose, withState, withHandlers } from 'recompose'

import { Pagination } from './'

const TableRow = ({
  toggleUser,
  selected,
  id,
  email,
  roles,
  username,
  title = '',
  firstName = '',
  lastName = '',
  affiliation,
  isConfirmed,
  roleOptions,
}) => (
  <Row>
    <td>
      <Input checked={selected} onClick={toggleUser} type="checkbox" />
    </td>
    <td>{email}</td>
    <td>{`${firstName} ${lastName}`}</td>
    <td>{affiliation}</td>
    <td>
      {roles &&
        roles.map((r, i, arr) => (
          <Role key={r}>{`${roleOptions[r]}${
            i !== arr.length - 1 ? ', ' : ''
          }`}</Role>
        ))}
    </td>
    <td>
      <Tag>{isConfirmed ? 'Confirmed' : 'Invited'}</Tag>
    </td>
    <td>
      <Action href={`/admin/users/edit/${id}`}>Edit</Action>
    </td>
  </Row>
)

const Users = ({
  users,
  toggleUser,
  toggleAllUsers,
  incrementPage,
  decrementPage,
  page,
  itemsPerPage,
  history,
  journal,
}) => (
  <div>
    <Header>
      <BreadCrumbs>
        <span>Admin Dashboard</span>
        <span>Users</span>
      </BreadCrumbs>
      <AddButton onClick={() => history.push('/admin/users/add')}>
        <Icon color="#667080">plus-circle</Icon>
        &nbsp; Add User
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
          <td width="200">Roles</td>
          <td>Status</td>
          <td width="50" />
        </tr>
      </thead>
      <tbody>
        {users.map(u => (
          <TableRow
            key={u.id}
            {...u}
            roleOptions={journal.roles}
            toggleUser={toggleUser(u)}
          />
        ))}
      </tbody>
    </Table>
  </div>
)

export default compose(
  ConnectPage(() => [actions.getUsers()]),
  withRouter,
  withJournal,
  connect(state => ({ currentUsers: get(state, 'users.users') })),
  withState('users', 'setUsers', props =>
    props.currentUsers.map(u => ({ ...u, selected: false })),
  ),
  withState('itemsPerPage', 'setItemsPerPage', 50),
  withState('page', 'setPage', 0),
  withHandlers({
    incrementPage: ({ setPage }) => () => {
      setPage(p => p + 1)
    },
    decrementPage: ({ setPage }) => () => {
      setPage(p => (p > 0 ? p - 1 : p))
    },
    toggleUser: ({ setUsers }) => user => () => {
      setUsers(prev =>
        prev.map(u => (u.id === user.id ? { ...u, selected: !u.selected } : u)),
      )
    },
    toggleAllUsers: ({ setUsers }) => () => {
      setUsers(users => users.map(u => ({ ...u, selected: !u.selected })))
    },
  }),
)(Users)

// #region styled-components
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
`

const BreadCrumbs = styled.div`
  & span {
    font-size: 17px;
    text-align: left;
    color: #667080;

    &:after {
      content: '>';
      padding: 0 10px;
    }
    &:last-child {
      font-size: 24px;
      font-weight: bold;
      &:after {
        content: '';
    }
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
  width: 100%;

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
  &:hover {
    background-color: #e6e7e9;
    a {
      display: block;
    }
  }
`

const Tag = styled.span`
  border: solid 1px #667080;
  text-transform: uppercase;
  font-family: Helvetica;
  font-size: 12px;
  font-weight: bold;
  text-align: left;
  color: #667080;
  padding: 2px 10px;
  margin-right: 5px;
`

const Role = styled.span`
  height: 17px;
  font-size: 14px;
  text-align: left;
  color: #667080;
  text-transform: uppercase;
`

const Action = styled.a`
  color: #667080;
  display: none;
`

const Input = styled.input`
  height: 20px;
  width: 20px;
`
// #endregion
