import React from 'react'
import styled from 'styled-components'
import { reduxForm } from 'redux-form'
import { required } from 'xpub-validators'
import { Button, ValidatedField, TextField } from '@pubsweet/ui'

const Step1 = ({ journal, handleSubmit }) => (
  <FormContainer onSubmit={handleSubmit}>
    <Row>
      <RowItem>
        <Label> Password </Label>
        <ValidatedField
          component={input => <TextField {...input} type="password" />}
          name="password"
          validate={[required]}
        />
      </RowItem>
    </Row>
    <Row>
      <Button primary type="submit">
        CONFIRM
      </Button>
    </Row>
  </FormContainer>
)

export default reduxForm({
  form: 'signUpInvitation',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(Step1)

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
