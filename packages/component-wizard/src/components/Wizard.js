import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { reduxForm } from 'redux-form'
import { withJournal } from 'xpub-journal'
import { ValidatedField, Button } from '@pubsweet/ui'
import {
  compose,
  withHandlers,
  withState,
  getContext,
  withContext,
} from 'recompose'

import classes from './Wizard.local.scss'
import { Steps, SortableList } from './'

const { Step } = Steps

const items = [
  { name: '1aurel', age: 2 },
  { name: '2costel' },
  { name: '3dorel' },
  { name: '4cocojambo' },
  { name: '5gicuta' },
]

const validate = values => {
  const errors = {}
  return errors
}

const WizardStep = ({
  children: stepChildren,
  title,
  buttons,
  nextStep,
  prevStep,
  handleSubmit,
  isFinal,
  isFirst,
  goBack,
  ...rest
}) => (
  <div className={classnames(classes.step)}>
    <form className={classnames(classes.form)} onSubmit={handleSubmit}>
      <h3>{title}</h3>
      {stepChildren &&
        stepChildren.map(
          ({ fieldId, validate, renderComponent: Comp, ...rest }, index) => (
            <ValidatedField
              component={input => <Comp {...rest} {...input} />}
              key={fieldId}
              name={fieldId}
              validate={validate}
            />
          ),
        )}
      <div className={classnames(classes.buttons)}>
        <Button onClick={isFirst ? goBack : prevStep}>
          {isFirst ? 'Cancel' : 'Back'}
        </Button>
        <Button primary type="submit">
          {isFinal ? 'Finish' : 'Next'}
        </Button>
      </div>
    </form>
  </div>
)

const FormStep = compose(
  reduxForm({
    form: 'wizard',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    validate,
    onSubmit: (values, dispatch, { nextStep, isFinal }) => {
      if (!isFinal) {
        nextStep()
      }
    },
  }),
  getContext({
    goBack: PropTypes.func,
    isFinal: PropTypes.bool,
    isFirst: PropTypes.bool,
  }),
)(WizardStep)

const Wizard = ({
  journal: { wizard: { showProgress, steps } },
  getSteps,
  step,
  nextStep,
  prevStep,
  ...rest
}) => (
  <div className={classnames(classes.container)}>
    {showProgress && (
      <Steps currentStep={step}>
        {getSteps().map((step, index) => (
          <Step index={index} key={step} title={step} />
        ))}
      </Steps>
    )}
    <FormStep {...steps[step]} nextStep={nextStep} prevStep={prevStep} />
  </div>
)

export default compose(
  withJournal,
  withState('step', 'changeStep', 0),
  withState('listItems', 'changeItems', items),
  withHandlers({
    moveItem: ({ changeItems }) => (dragIndex, hoverIndex) => {
      changeItems(prev => SortableList.moveItem(prev, dragIndex, hoverIndex))
    },
  }),
  withHandlers({
    getSteps: ({ journal: { wizard: { steps } } }) => () =>
      steps.map(w => w.label),
    nextStep: ({ changeStep, journal: { wizard: { steps } } }) => () => {
      changeStep(step => (step === steps.length - 1 ? step : step + 1))
    },
    prevStep: ({ changeStep }) => () =>
      changeStep(step => (step <= 0 ? step : step - 1)),
  }),
  withContext(
    {
      goBack: PropTypes.func,
      isFinal: PropTypes.bool,
      isFirst: PropTypes.bool,
    },
    ({ history: { goBack }, step, journal: { wizard: { steps } } }) => ({
      goBack,
      isFinal: step === steps.length - 1,
      isFirst: step === 0,
    }),
  ),
)(Wizard)
