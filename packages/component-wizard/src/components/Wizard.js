import React from 'react'
import classnames from 'classnames'
import { withJournal } from 'xpub-journal'
import { AbstractEditor } from 'xpub-edit'
import { reduxForm, Field } from 'redux-form'
import { TextField, YesOrNo, Menu, Checkbox } from '@pubsweet/ui'
import { compose, withHandlers, withState } from 'recompose'

import classes from './Wizard.local.scss'
import { Dropdown, Steps, SortableList, ButtonGroup } from './'

const { Step } = Steps

const items = [
  { name: '1aurel', age: 2 },
  { name: '2costel' },
  { name: '3dorel' },
  { name: '4cocojambo' },
  { name: '5gicuta' },
]

const renderField = ({ renderComponent, input, ...rest }) => {
  console.log('Render field', input, rest)
  return React.createElement(renderComponent, { ...rest, ...input })
}

const WizardStep = ({
  children: stepChildren,
  title,
  buttons,
  nextStep,
  prevStep,
  onSubmit,
  ...rest
}) => (
  <div className={classnames(classes.step)}>
    <form onSubmit={onSubmit}>
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
    </form>
    <ButtonGroup buttons={buttons} onBack={prevStep} onNext={nextStep} />
  </div>
)

const FormStep = compose(
  reduxForm({
    form: 'wizard',
    onSubmit: () => console.log('am dat surmit'),
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
  }),
)(WizardStep)

const Wizard = ({
  journal: { wizard },
  getSteps,
  step,
  nextStep,
  prevStep,
  listItems,
  renderChild,
  handleSubmit,
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
      nextStep={nextStep}
      onSubmit={handleSubmit}
      prevStep={prevStep}
      renderChild={renderChild}
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
    nextStep: ({ changeStep, journal: { wizard } }) => () =>
      changeStep(step => (step === wizard.length ? step : step + 1)),
    prevStep: ({ changeStep }) => () =>
      changeStep(step => (step <= 0 ? step : step - 1)),
  }),
)(Wizard)
