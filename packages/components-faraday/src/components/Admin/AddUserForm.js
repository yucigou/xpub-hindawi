import React from 'react'
import styled from 'styled-components'
import { ValidatedField, TextField, Menu, th } from '@pubsweet/ui'

import { required } from 'xpub-validators'

const emailRegex = new RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, //eslint-disable-line
)

const emailValidator = value =>
  emailRegex.test(value) ? undefined : 'Invalid email'

const AddUserForm = ({ roles, journal, error }) => {
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
            validate={[emailValidator]}
          />
        </RowItem>
        <RowItem data-test="role-selector">
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
        <RowItem data-test="title-selector">
          <Label> Title </Label>
          <ValidatedField
            component={input => <Menu {...input} options={journal.title} />}
            name="title"
          />
        </RowItem>
      </Row>
      <Row>
        <RowItem>{error && <ErrorMessage>{error}</ErrorMessage>}</RowItem>
      </Row>
    </div>
  )
}

export default AddUserForm

// #region styles

const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin: calc(${th('subGridUnit')}*3) 0;
`

const RowItem = styled.div`
  flex: 1;
  margin-right: calc(${th('subGridUnit')}*3);
`

const Title = styled.h4`
  font-size: ${th('fontSizeHeading4')};
  color: ${th('colorPrimary')};
  margin: calc(${th('subGridUnit')}*2) 0;
`

const Label = styled.div`
  font-size: ${th('fontSizeBase')};
  text-transform: uppercase;
`

const ErrorMessage = styled.div`
  color: ${th('colorError')};
`

// #endregion
