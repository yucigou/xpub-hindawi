import React from 'react'
import styled from 'styled-components'
import { ValidatedField, TextField, Menu } from '@pubsweet/ui'

import { required } from 'xpub-validators'

const AddUserForm = ({ roles }) => {
  const roleOptions = roles.filter(r => r.value === 'editorInChief')
  return (
    <div>
      <h3>Add user</h3>
      <Row>
        <RowItem>
          <Label> Email</Label>
          <ValidatedField
            component={TextField}
            name="email"
            validate={[required]}
          />
        </RowItem>
      </Row>
      <Row>
        <RowItem>
          <Label> Role</Label>
          <ValidatedField
            component={input => <Menu {...input} options={roleOptions} />}
            name="role"
            validate={[required]}
          />
        </RowItem>
      </Row>
    </div>
  )
}

export default AddUserForm

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
