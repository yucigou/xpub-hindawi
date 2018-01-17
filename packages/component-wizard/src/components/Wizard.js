import React from 'react'
import classnames from 'classnames'

import classes from './Wizard.local.scss'
import WizardFormStep from './WizardFormStep'
import Progress from './Progress'

const { Step } = Progress

export default ({
  journal: { wizard: { showProgress, steps } },
  getSteps,
  nextStep,
  prevStep,
  step,
}) => (
  <div className={classnames(classes.container)}>
    {showProgress && (
      <Progress currentStep={step}>
        {getSteps().map((step, index) => (
          <Step index={index} key={step} title={step} />
        ))}
      </Progress>
    )}
    <WizardFormStep {...steps[step]} nextStep={nextStep} prevStep={prevStep} />
  </div>
)
