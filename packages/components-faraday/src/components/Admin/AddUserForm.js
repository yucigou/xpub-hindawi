import React from 'react'
import styled from 'styled-components'
import { ValidatedField, TextField, Menu } from '@pubsweet/ui'

import { required } from 'xpub-validators'

const AddUserForm = ({ roles, journal }) => {
  const roleOptions = roles.filter(r =>
    ['editorInChief', 'author', 'admin'].includes(r.value),
  )
  return (
    <div>
      <Title>Add user</Title>
      <Row>
        <RowItem>
          <Label> Email*</Label>
          <ValidatedField
            component={TextField}
            name="email"
            validate={[required]}
          />
        </RowItem>
        <RowItem>
          <Label> Role*</Label>
          <ValidatedField
            component={input => <Menu {...input} options={roleOptions} />}
            name="role"
            validate={[required]}
          />
        </RowItem>
      </Row>
      <Row>
        <RowItem>
          <Label> First name </Label>
          <ValidatedField component={TextField} name="firstName" />
        </RowItem>
        <RowItem>
          <Label> Last name </Label>
          <ValidatedField component={TextField} name="lastName" />
        </RowItem>
      </Row>
      <Row>
        <RowItem>
          <Label> Affiliation </Label>
          <ValidatedField component={TextField} name="affiliation" />
        </RowItem>
        <RowItem>
          <Label> Title </Label>
          <ValidatedField
            component={input => <Menu {...input} options={journal.title} />}
            name="title"
          />
        </RowItem>
      </Row>
    </div>
  )
}

export default AddUserForm

// #region styles

const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px 0;
`

const RowItem = styled.div`
  flex: 1;
  margin-right: 20px;
`

const Title = styled.h4`
  font-size: ${({ theme }) => theme.fontSizeHeading4};
  color: ${({ theme }) => theme.colorPrimary};
  margin: 10px 0;
`

const Label = styled.div`
  font-size: ${({ theme }) => theme.fontSizeBase};
  text-transform: uppercase;
`
// #endregion
