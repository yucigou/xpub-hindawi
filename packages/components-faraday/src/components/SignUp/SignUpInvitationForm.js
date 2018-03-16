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
  error,
}) => (
  <Root>
    <Title>Add New Account Details</Title>
    <Subtitle>
      Your details have been pre-filled, please review and confirm before set
      your password.
    </Subtitle>
    <Email>{email}</Email>
    {error && <Err>Token expired or Something went wrong.</Err>}
    {step === 0 && (
      <Step0
        error={error}
        initialValues={initialValues}
        journal={journal}
        onSubmit={nextStep}
      />
    )}
    {step === 1 && (
      <Step1
        error={error}
        initialValues={initialValues}
        journal={journal}
        onSubmit={submitConfirmation}
      />
    )}
  </Root>
)

export default SignUpInvitation

// #region styles
const Root = styled.div`
  max-width: 550px;
  min-width: 300px;
  margin: 0 auto;
  display: flex;
  border: ${({ theme }) => theme.borderDefault};
  background-color: ${({ theme }) => theme.backgroundColorReverse};
  padding: 20px;
  flex-direction: column;
`

const Title = styled.div`
  font-size: ${({ theme }) => theme.fontSizeHeading5};
  font-family: ${({ theme }) => theme.fontHeading};
  color: ${({ theme }) => theme.colorPrimary};
  font-weight: bold;
  text-align: center;
  margin: 10px auto;
`
const Subtitle = styled.div`
  font-size: ${({ theme }) => theme.fontSizeBaseSmall};
  font-family: ${({ theme }) => theme.fontReading};
  font-weight: normal;
  text-align: center;
  margin: 10px auto;
`

const Email = styled.div`
  font-size: ${({ theme }) => theme.fontSizeBase};
  font-family: ${({ theme }) => theme.fontReading};
  font-weight: normal;
  text-align: center;
  margin: 10px auto;
`
const Err = styled.div`
  color: ${({ theme }) => theme.colorError};
  text-align: center;
`
// #endregion
