import React from 'react'
import { get, isEqual } from 'lodash'
import { connect } from 'react-redux'
import styled, { withTheme } from 'styled-components'
import { Icon, Menu, th } from '@pubsweet/ui'
import { actions } from 'pubsweet-client'
import { ConnectPage } from 'xpub-connect'
import { withJournal } from 'xpub-journal'
import { withRouter, Link } from 'react-router-dom'
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
  editorInChief,
  handlingEditor,
  admin,
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
      <Role>{`Author${isEqual(editorInChief, true) ? ', Editor in Chief' : ''}${
        isEqual(handlingEditor, true) ? ', Handling Editor' : ''
      }${isEqual(admin, true) ? ', Admin' : ''}`}</Role>
    </td>
    <td>
      <Tag>{isConfirmed ? 'Confirmed' : 'Invited'}</Tag>
    </td>
    <td>
      <Action to={`/admin/users/edit/${id}`}>Edit</Action>
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
        <AddButton
          data-test="button-add-user"
          onClick={() => history.push('/admin/users/add')}
        >
          <Icon color={theme.colorPrimary} size={3}>
            plus-circle
          </Icon>
          &nbsp; Add User
        </AddButton>
      </Header>
      <SubHeader>
        <div>
          <span>Bulk actions: </span>
          <Menu
            inline
            onChange={value => value}
            options={[
              { value: 'deactivate', label: 'Deactivate' },
              { value: 'activate', label: 'Activate' },
            ]}
            value="activate"
          />

          <Menu
            inline
            onChange={value => value}
            options={[
              { value: 'sort', label: 'SORT' },
              { value: 'unsort', label: 'UNSORT' },
            ]}
            value="sort"
          />

          <Icon color={theme.colorPrimary} size={4}>
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
            <td width="220">Roles</td>
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
  font-family: ${th('fontInterface')};
  font-size: ${th('fontSizeBaseSmall')};
  text-align: left;
  color: ${th('colorPrimary')};
  background-color: ${th('backgroundColor')};

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
    font-size: ${th('fontSizeBase')};
    text-align: left;
    color: ${th('colorPrimary')};
    cursor: pointer;
    margin-left: calc(${th('subGridUnit')}*2);

    &:after {
      content: '>';
      padding: 0 calc(${th('subGridUnit')}*2);
    }
    &:last-child {
      font-size: ${th('fontSizeBase')};
      font-weight: bold;
      &:after {
        content: '';
    }
  }
`

const SubHeader = styled.div`
  align-items: center;
  border-bottom: ${th('borderDefault')};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${th('gridUnit')};
  padding-bottom: calc(${th('subGridUnit')}*2);

  > div:first-child {
    display: flex;
    align-items: center;
    > div {
      margin-right: calc(${th('subGridUnit')});
    }
  }

  span {
    font-family: ${th('fontReading')};
    font-size: ${th('fontSizeBaseSmall')};
    text-align: left;
    color: ${th('colorPrimary')};
    margin-right: calc(${th('subGridUnit')});
  }
`

const Table = styled.table`
  border-spacing: 0;
  border-collapse: collapse;
  width: 100%;

  & thead tr {
    height: 40px;
    border-bottom: ${th('borderDefault')};
    font-family: ${th('fontReading')};
    font-size: ${th('fontSizeBaseSmall')};
    font-weight: bold;
    text-align: left;
    color: ${th('colorPrimary')};
  }
`

const Row = styled.tr`
  border-bottom: ${th('borderDefault')};
  color: ${th('colorPrimary')};
  font-family: ${th('fontReading')};
  font-size: ${th('fontSizeBaseSmall')};
  height: 40px;
  text-align: left;
  &:hover {
    background-color: ${th('backgroundColorReverse')};
    a {
      display: block;
    }
  }
`

const Tag = styled.span`
  border: solid 1px #667080;
  text-transform: uppercase;
  font-family: ${th('fontReading')};
  font-size: ${th('fontSizeBaseSmall')};
  font-weight: bold;
  text-align: left;
  color: ${th('colorPrimary')};
  padding: 2px calc(${th('subGridUnit')}*2);
  margin-right: calc(${th('subGridUnit')});
`

const Role = styled.div`
  font-size: ${th('fontSizeBaseSmall')};
  text-align: left;
  color: ${th('colorPrimary')};
  text-transform: uppercase;
  line-height: 1.5;
`

const Action = styled(Link)`
  color: ${th('colorPrimary')};
  display: none;
`

const Input = styled.input`
  height: 20px;
  width: 20px;
`
// #endregion
