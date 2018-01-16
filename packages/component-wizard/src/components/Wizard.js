import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { pick, debounce } from 'lodash'
import { reduxForm } from 'redux-form'
import { withJournal } from 'xpub-journal'
import { ConnectPage } from 'xpub-connect'
import { ValidatedField, Button } from '@pubsweet/ui'
import { selectCollection, selectFragment } from 'xpub-selectors'
import {
  compose,
  withHandlers,
  withState,
  getContext,
  withContext,
  withProps,
} from 'recompose'
import { actions } from 'pubsweet-client'

import classes from './Wizard.local.scss'
import { Steps } from './'

const { Step } = Steps

const validate = values => {
  const errors = {}
  return errors
}

const onChange = (values, dispatch, { project, version }) => {
  dispatch(
    actions.updateFragment(project, {
      id: version.id,
      rev: version.rev,
      ...values,
    }),
  )
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
}) => (
  <div className={classnames(classes.step)}>
    <form
      className={classnames(classes.form)}
      name="metadata"
      onSubmit={handleSubmit}
    >
      <h3>{title}</h3>
      {stepChildren &&
        stepChildren.map(
          ({ fieldId, validate, renderComponent: Comp, ...rest }) => (
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
  getContext({
    goBack: PropTypes.func,
    isFinal: PropTypes.bool,
    isFirst: PropTypes.bool,
    project: PropTypes.object,
    version: PropTypes.object,
    wizard: PropTypes.object,
  }),
  withProps(({ version, wizard }) => ({
    initialValues: pick(version, wizard.formSectionKeys),
    readonly: !!version.submitted,
  })),
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
    onChange: debounce(onChange, 1000, { maxWait: 5000 }),
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
  ConnectPage(({ match }) => [
    actions.getCollection({ id: match.params.project }),
    actions.getFragment(
      { id: match.params.project },
      { id: match.params.version },
    ),
  ]),
  connect((state, { match }) => {
    const project = selectCollection(state, match.params.project)
    const version = selectFragment(state, match.params.version)

    return { project, version }
  }),
  withJournal,
  withState('step', 'changeStep', 0),
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
      project: PropTypes.object,
      version: PropTypes.object,
      wizard: PropTypes.object,
    },
    ({ history: { goBack }, step, project, version, journal: { wizard } }) => ({
      goBack,
      isFinal: step === wizard.steps.length - 1,
      isFirst: step === 0,
      project,
      version,
      wizard,
    }),
  ),
)(Wizard)
