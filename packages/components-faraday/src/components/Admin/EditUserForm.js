import React from 'react'
import styled from 'styled-components'
import { ValidatedField, TextField, Menu, CheckboxGroup } from '@pubsweet/ui'

import { required } from 'xpub-validators'

const EditUserForm = ({ roles, journal, user }) => {
  const roleOptions = roles.filter(r =>
    ['editorInChief', 'author', 'admin'].includes(r.value),
  )
  return (
    <div>
      <h3>Edit user</h3>
      <h5>{user.email}</h5>
      <Row>
        <RowItem>
          <Label> First name* </Label>
          <ValidatedField
            component={TextField}
            name="firstName"
            validate={[required]}
          />
        </RowItem>
        <RowItem>
          <Label> Last name* </Label>
          <ValidatedField
            component={TextField}
            name="lastName"
            validate={[required]}
          />
        </RowItem>
      </Row>
      <Row>
        <RowItem>
          <Label> Affiliation* </Label>
          <ValidatedField
            component={TextField}
            name="affiliation"
            validate={[required]}
          />
        </RowItem>
        <RowItem>
          <Label> Title* </Label>
          <ValidatedField
            component={input => <Menu {...input} options={journal.title} />}
            name="title"
          />
        </RowItem>
      </Row>
      <Row>
        <RowItem>
          <Label> Roles*</Label>
          <ValidatedField
            component={input => (
              <CheckboxGroup {...input} options={roleOptions} />
            )}
            name="roles"
          />
        </RowItem>
      </Row>
    </div>
  )
}

export default EditUserForm

const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px 0;
`

const RowItem = styled.div`
  flex: 1;
  margin-right: 20px;
`

const Label = styled.div`
  font-size: 14px;
  text-transform: uppercase;
`
