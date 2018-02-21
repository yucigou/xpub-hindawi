import React from 'react'
import styled from 'styled-components'
import { Steps } from 'pubsweet-components-faraday/src/components'
// import { Steps } from '@pubsweet/ui'

import WizardFormStep from './WizardFormStep'

export default ({
  journal: { wizard: { showProgress, steps } },
  getSteps,
  nextStep,
  prevStep,
  step,
}) => (
  <Root>
    {showProgress && (
      <Steps currentStep={step} margin="0 20px 60px 0">
        {getSteps().map((step, index) => (
          <Steps.Step key={step} title={step} />
        ))}
      </Steps>
    )}
    <WizardFormStep {...steps[step]} nextStep={nextStep} prevStep={prevStep} />
  </Root>
)

const Root = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`
