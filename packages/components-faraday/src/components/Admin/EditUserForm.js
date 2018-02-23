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
      <Title>Edit user</Title>
      <Subtitle>{user.email}</Subtitle>
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

// #region styles

const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px 0;
  background-color: ${({ theme }) => theme.backgroundColorReverse};
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

const Subtitle = styled.div`
  font-size: ${({ theme }) => theme.fontSizeBase};
  color: ${({ theme }) => theme.colorPrimary};
  margin: 0;
`

const Label = styled.div`
  font-size: ${({ theme }) => theme.fontSizeBase};
  text-transform: uppercase;
`
// #endregion
