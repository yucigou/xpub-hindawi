import React from 'react'
import classnames from 'classnames'
import { withJournal } from 'xpub-journal'
import { reduxForm, Field } from 'redux-form'
import { compose, withHandlers, withState } from 'recompose'
import { ValidatedField } from '@pubsweet/ui'
import { required } from 'xpub-validators'

import classes from './Wizard.local.scss'
import { Steps, SortableList, ButtonGroup } from './'

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

const renderField = ({ renderComponent: Comp, input, ...rest }) => (
  <ValidatedField
    component={() => <Comp {...input} {...rest} />}
    name={rest.fieldId}
    required
    validate={[required]}
  />
)

const WizardStep = ({
  children: stepChildren,
  title,
  buttons,
  nextStep,
  prevStep,
  handleSubmit,
  ...rest
}) => (
  <div className={classnames(classes.step)}>
    <form onSubmit={handleSubmit}>
      <h3>{title}</h3>
      {stepChildren &&
        stepChildren.map((child, index) => (
          <Field
            component={renderField}
            key={child.fieldId}
            name={child.fieldId}
            {...child}
          />
        ))}
      <button type="submit">Next</button>
    </form>
    <ButtonGroup buttons={buttons} onBack={prevStep} onNext={nextStep} />
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
)(WizardStep)

const Wizard = ({
  journal: { wizard },
  getSteps,
  step,
  nextStep,
  prevStep,
  ...rest
}) => (
  <div className={classnames(classes.container)}>
    <Steps currentStep={step}>
      {getSteps().map((step, index) => (
        <Step index={index} key={step} title={step} />
      ))}
    </Steps>
    <FormStep
      {...wizard[step]}
      isFinal={step === wizard.length - 1}
      nextStep={nextStep}
      prevStep={prevStep}
    />
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
    getSteps: ({ journal: { wizard } }) => () => wizard.map(w => w.label),
    nextStep: ({ changeStep, journal: { wizard } }) => () => {
      changeStep(step => (step === wizard.length - 1 ? step : step + 1))
    },
    prevStep: ({ changeStep }) => () =>
      changeStep(step => (step <= 0 ? step : step - 1)),
  }),
)(Wizard)
