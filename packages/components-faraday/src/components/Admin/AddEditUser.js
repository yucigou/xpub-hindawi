import React from 'react'
import { get, map } from 'lodash'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import styled from 'styled-components'
import { actions } from 'pubsweet-client'
import { create } from 'pubsweet-client/src/helpers/api'
import { withJournal } from 'xpub-journal'
import { ConnectPage } from 'xpub-connect'
import { selectUser } from 'xpub-selectors'
import { Button } from '@pubsweet/ui'
import { compose, withProps, withHandlers, withState } from 'recompose'

import AddUserForm from './AddUserForm'
import EditUserForm from './EditUserForm'

const getRoleOptions = journal =>
  map(journal.roles, (value, key) => ({ label: value, value: key }))

const onSubmit = (values, dispatch, { isEdit }) => {
  if (!isEdit) {
    create('/users/invite', values).then(
      r => r,
      // err => console.log(err),
    )
  }
}

const AddEditUser = ({ handleSubmit, journal, isEdit, user }) => (
  <Root>
    <FormContainer onSubmit={handleSubmit}>
      {isEdit ? (
        <EditUserForm roles={getRoleOptions(journal)} user={user} />
      ) : (
        <AddUserForm roles={getRoleOptions(journal)} />
      )}
      <Row>
        <Button primary type="submit">
          Save user
        </Button>
      </Row>
    </FormContainer>
  </Root>
)

export default compose(
  withJournal,
  withState('isEdit', 'setEdit', false),
  withHandlers({
    setEditMode: ({ setEdit }) => value => setEdit(value),
  }),
  ConnectPage(({ match, setEditMode }) => {
    const id = get(match, 'params.userId')
    const isEditingMode = match.path.includes('/edit/:userId')
    if (isEditingMode && id) {
      setEditMode(isEditingMode)
      return [actions.getUser({ id })]
    }
    return []
  }),
  connect((state, { match }) => ({
    user: selectUser(state, get(match, 'params.userId')),
  })),
  withProps(({ user }) => ({ initialValues: user })),
  reduxForm({
    form: 'userManagement',
    onSubmit,
  }),
)(AddEditUser)

const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 60em;
`

const FormContainer = styled.form`
  border: 1px solid var(--color-pending);
  margin: 0 auto;
  min-width: 300px;
  padding: 20px;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px 0;
  align-items: center;
  justify-content: space-evenly;
`
