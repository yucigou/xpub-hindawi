import React from 'react'
import styled from 'styled-components'
import { ValidatedField, TextField, Menu, Checkbox, th } from '@pubsweet/ui'

import { required } from 'xpub-validators'

const EditUserForm = ({ roles, journal, user, error }) => (
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
            <Checkbox
              checked
              readonly
              type="checkbox"
              {...input}
              label="Author"
            />
          )}
          name="author"
        />
        <ValidatedField
          component={input => (
            <Checkbox
              checked={input.value}
              type="checkbox"
              {...input}
              label="Editor in Chief"
            />
          )}
          name="editorInChief"
        />
        <ValidatedField
          component={input => (
            <Checkbox
              checked={input.value}
              type="checkbox"
              {...input}
              label="Handling Editor"
            />
          )}
          name="handlingEditor"
        />
        <ValidatedField
          component={input => (
            <Checkbox
              checked={input.value}
              type="checkbox"
              {...input}
              label="Admin"
            />
          )}
          name="admin"
        />
      </RowItem>
    </Row>
    <Row>
      <RowItem>{error && <ErrorMessage>{error}</ErrorMessage>}</RowItem>
    </Row>
  </div>
)

export default EditUserForm

// #region styles

const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin: calc(${th('subGridUnit')}*3) 0;
  background-color: ${th('backgroundColorReverse')};
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

const Subtitle = styled.div`
  font-size: ${th('fontSizeBase')};
  color: ${th('colorPrimary')};
  margin: 0;
`

const Label = styled.div`
  font-size: ${th('fontSizeBase')};
  text-transform: uppercase;
`
const ErrorMessage = styled.div`
  color: ${th('colorError')};
`

// #endregion
