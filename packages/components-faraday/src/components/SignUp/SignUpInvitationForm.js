import React from 'react'
import styled from 'styled-components'

import Step0 from './SignUpStep0'
import Step1 from './SignUpStep1'

const SignUpInvitation = ({
  journal,
  email,
  token,
  step,
  nextStep,
  submitConfirmation,
  initialValues,
}) => (
  <Root>
    <Title>Add New Account Details</Title>
    <Subtitle>
      Your details have been pre-filled, please review and confirm before set
      your password.
    </Subtitle>
    <Email>{email}</Email>
    {step === 0 && (
      <Step0
        initialValues={initialValues}
        journal={journal}
        onSubmit={nextStep}
      />
    )}
    {step === 1 && (
      <Step1
        initialValues={initialValues}
        journal={journal}
        onSubmit={submitConfirmation}
      />
    )}
  </Root>
)

export default SignUpInvitation

const Root = styled.div`
  max-width: 500px;
  min-width: 300px;
  margin: 0 auto;
  display: flex;
  border: 1px solid var(--color-pending);
  padding: 20px;
  flex-direction: column;
`

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin: 10px auto;
`
const Subtitle = styled.div`
  font-size: 13px;
  font-weight: normal;
  text-align: center;
  margin: 10px auto;
`

const Email = styled.div`
  font-size: 16px;
  font-weight: normal;
  text-align: center;
  margin: 10px auto;
`
