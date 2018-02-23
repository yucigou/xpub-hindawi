import React from 'react'
import { get } from 'lodash'
import { connect } from 'react-redux'
import styled, { withTheme } from 'styled-components'
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
  theme,
}) => {
  const slicedUsers = users.slice(
    page * itemsPerPage,
    itemsPerPage * (page + 1),
  )
  return (
    <div>
      <Header>
        <BreadCrumbs>
          <span>Admin Dashboard</span>
          <span>Users</span>
        </BreadCrumbs>
        <AddButton onClick={() => history.push('/admin/users/add')}>
          <Icon color={theme.colorPrimary}>plus-circle</Icon>
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

          <Icon color={theme.colorPrimary} size={24}>
            search
          </Icon>
        </div>
        <Pagination
          decrementPage={decrementPage}
          hasMore={itemsPerPage * (page + 1) < users.length}
          incrementPage={incrementPage}
          itemsPerPage={itemsPerPage}
          maxLength={users.length}
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
          {slicedUsers.map(u => (
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
}

export default compose(
  ConnectPage(() => [actions.getUsers()]),
  withRouter,
  withJournal,
  withTheme,
  connect(state => ({ currentUsers: get(state, 'users.users') })),
  withState('users', 'setUsers', props =>
    props.currentUsers.map(u => ({ ...u, selected: false })),
  ),
  withState('itemsPerPage', 'setItemsPerPage', 20),
  withState('page', 'setPage', 0),
  withHandlers({
    incrementPage: ({ setPage, page, itemsPerPage, users }) => () => {
      if (page * itemsPerPage + itemsPerPage < users.length) {
        setPage(p => p + 1)
      }
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
  font-family: ${({ theme }) => theme.fontInterface};
  font-size: ${({ theme }) => theme.fontSizeBaseSmall};
  text-align: left;
  color: ${({ theme }) => theme.colorPrimary};
  background-color: ${({ theme }) => theme.backgroundColor};

  &:active,
  &:focus {
    outline: none;
  }
  &:hover {
    opacity: 0.7;
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
    color: ${({ theme }) => theme.colorPrimary};

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
  border-bottom: ${({ theme }) => theme.borderDefault};
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
    font-family: ${({ theme }) => theme.fontReading};
    font-size: ${({ theme }) => theme.fontSizeBaseSmall};
    text-align: left;
    color: ${({ theme }) => theme.colorPrimary};
  }
`

const Table = styled.table`
  border-spacing: 0;
  border-collapse: collapse;
  margin-top: 10px;
  width: 100%;

  & thead tr {
    height: 40px;
    border-bottom: ${({ theme }) => theme.borderDefault};
    font-family: ${({ theme }) => theme.fontReading};
    font-size: ${({ theme }) => theme.fontSizeBaseSmall};
    font-weight: bold;
    text-align: left;
    color: ${({ theme }) => theme.colorPrimary};
  }
`

const Row = styled.tr`
  border-bottom: ${({ theme }) => theme.borderDefault};
  color: ${({ theme }) => theme.colorPrimary};
  font-family: ${({ theme }) => theme.fontReading};
  font-size: ${({ theme }) => theme.fontSizeBaseSmall};
  height: 40px;
  text-align: left;
  &:hover {
    background-color: ${({ theme }) => theme.backgroundColorReverse};
    a {
      display: block;
    }
  }
`

const Tag = styled.span`
  border: solid 1px #667080;
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.fontReading};
  font-size: 12px;
  font-weight: bold;
  text-align: left;
  color: ${({ theme }) => theme.colorPrimary};
  padding: 2px 10px;
  margin-right: 5px;
`

const Role = styled.span`
  height: 17px;
  font-size: ${({ theme }) => theme.fontSizeBaseSmall};
  text-align: left;
  color: ${({ theme }) => theme.colorPrimary};
  text-transform: uppercase;
`

const Action = styled.a`
  color: ${({ theme }) => theme.colorPrimary};
  display: none;
`

const Input = styled.input`
  height: 20px;
  width: 20px;
`
// #endregion
