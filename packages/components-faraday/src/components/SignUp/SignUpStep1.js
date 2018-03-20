import React from 'react'
import styled from 'styled-components'
import { reduxForm } from 'redux-form'
import { required } from 'xpub-validators'
import { Button, ValidatedField, TextField, th } from '@pubsweet/ui'

const Step1 = ({ journal, handleSubmit, error }) => (
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
    {error && (
      <Row>
        <RowItem>
          <Err>{error}</Err>
        </RowItem>
      </Row>
    )}
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
  margin: ${th('gridUnit')} 0;
  align-items: center;
  justify-content: space-evenly;
`

const RowItem = styled.div`
  flex: 1;
  margin-right: ${th('gridUnit')};
`

const Label = styled.div`
  font-size: ${th('fontSizeBaseSmall')};
  font-family: ${th('fontReading')};
  text-transform: uppercase;
`
const Err = styled.div`
  color: ${th('colorError')};
  text-align: left;
  margin-top: calc(${th('gridUnit')}*-1);
`
