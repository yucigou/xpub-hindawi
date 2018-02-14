import React from 'react'
import styled from 'styled-components'
import { ValidatedField, TextField, Menu } from '@pubsweet/ui'

import { required } from 'xpub-validators'

const EditUserForm = ({ roles, user }) => {
  const roleOptions = roles.filter(r =>
    ['editorInChief', 'author'].includes(r.value),
  )
  return (
    <div>
      <h3>Edit user</h3>
      <h5>{user.email}</h5>
      <Row>
        <RowItem>
          <Label> First name </Label>
          <ValidatedField
            component={TextField}
            name="firstName"
            validate={[required]}
          />
        </RowItem>
        <RowItem>
          <Label> Middle name </Label>
          <ValidatedField component={TextField} name="middleName" />
        </RowItem>
        <RowItem>
          <Label> Last name </Label>
          <ValidatedField
            component={TextField}
            name="lastName"
            validate={[required]}
          />
        </RowItem>
      </Row>
      <Row>
        <RowItem>
          <Label> Affiliation </Label>
          <ValidatedField
            component={TextField}
            name="affiliation"
            validate={[required]}
          />
        </RowItem>
        <RowItem>
          <Label> Title </Label>
          <ValidatedField component={TextField} name="title" />
        </RowItem>
        <RowItem>
          <Label> Role</Label>
          <ValidatedField
            component={input => <Menu {...input} options={roleOptions} />}
            name="role"
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
