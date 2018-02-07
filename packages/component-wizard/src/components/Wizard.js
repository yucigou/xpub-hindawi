import React from 'react'
import classnames from 'classnames'
import { Steps } from 'pubsweet-components-faraday/src/components'

import classes from './Wizard.local.scss'
import WizardFormStep from './WizardFormStep'

export default ({
  journal: { wizard: { showProgress, steps } },
  getSteps,
  nextStep,
  prevStep,
  step,
}) => (
  <div className={classnames(classes.container)}>
    {showProgress && (
      <Steps currentStep={step}>
        {getSteps().map((step, index) => (
          <Steps.Step key={step} title={step} />
        ))}
      </Steps>
    )}
    <WizardFormStep {...steps[step]} nextStep={nextStep} prevStep={prevStep} />
  </div>
)
