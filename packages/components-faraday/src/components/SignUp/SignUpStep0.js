import React from 'react'
import styled from 'styled-components'
import { reduxForm } from 'redux-form'
import { isUndefined } from 'lodash'
import { required } from 'xpub-validators'
import { Button, ValidatedField, TextField, Menu } from '@pubsweet/ui'

const Step0 = ({ journal, handleSubmit, initialValues, error }) =>
  !isUndefined(initialValues) ? (
    <FormContainer onSubmit={handleSubmit}>
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
            validate={[required]}
          />
        </RowItem>
      </Row>
      <Row>
        <Button primary type="submit">
          CONFIRM & PROCEED TO SET PASSWORD
        </Button>
      </Row>
    </FormContainer>
  ) : (
    <div>{!isUndefined(error) && 'Loading...'}</div>
  )

export default reduxForm({
  form: 'signUpInvitation',
  destroyOnUnmount: false,
  enableReinitialize: true,
  forceUnregisterOnUnmount: true,
})(Step0)

const FormContainer = styled.form``

const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px 0;
  align-items: center;
  justify-content: space-evenly;
`

const RowItem = styled.div`
  flex: 1;
  margin-right: 20px;
`

const Label = styled.div`
  font-size: ${({ theme }) => theme.fontSizeBaseSmall};
  font-family: ${({ theme }) => theme.fontReading};
  text-transform: uppercase;
`
