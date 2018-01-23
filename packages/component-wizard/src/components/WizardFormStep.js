import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { debounce, pick, get, isEqual } from 'lodash'
import { actions } from 'pubsweet-client'
import { compose, getContext, withProps } from 'recompose'
import { reduxForm, formValueSelector, SubmissionError } from 'redux-form'

import WizardStep from './WizardStep'

import {
  getAutosave,
  autosaveRequest,
  autosaveFailure,
  autosaveSuccess,
} from '../redux/autosave'

const wizardSelector = formValueSelector('wizard')

const onChange = (
  values,
  dispatch,
  { project, version, wizard: { formSectionKeys }, setLoader },
  prevValues,
) => {
  const prev = pick(prevValues, formSectionKeys)
  const newValues = pick(values, formSectionKeys)
  // TODO: fix this if it sucks down the road
  if (!isEqual(prev, newValues)) {
    dispatch(autosaveRequest())
    dispatch(
      actions.updateFragment(project, {
        id: version.id,
        rev: version.rev,
        ...newValues,
      }),
    )
      .then(({ receivedAt }) => dispatch(autosaveSuccess(receivedAt)))
      .catch(() => dispatch(autosaveFailure()))
  }
}

const submitManuscript = (values, dispatch, project, version, history) => {
  dispatch(
    actions.updateFragment(project, {
      id: version.id,
      rev: version.rev,
      submitted: new Date(),
      ...values,
    }),
  )
    .then(() =>
      dispatch(
        actions.updateCollection({
          id: project.id,
          rev: project.rev,
          status: 'submitted',
        }),
      ),
    )
    .then(() => {
      history.push('/')
    })
    .catch(error => {
      if (error.validationErrors) {
        throw new SubmissionError()
      }
    })
}

const onSubmit = (
  values,
  dispatch,
  { nextStep, isFinal, history, project, version, ...rest },
) => {
  if (!isFinal) {
    nextStep()
  } else {
    submitManuscript(values, dispatch, project, version, history)
  }
}

export default compose(
  getContext({
    history: PropTypes.object,
    isFinal: PropTypes.bool,
    isFirst: PropTypes.bool,
    project: PropTypes.object,
    version: PropTypes.object,
    wizard: PropTypes.object,
    dispatchFns: PropTypes.object,
  }),
  withProps(({ version, wizard }) => ({
    initialValues: pick(version, wizard.formSectionKeys),
    readonly: !!get(version, 'submitted'),
  })),
  connect((state, { wizard: { formSectionKeys } }) => ({
    formValues: wizardSelector(state, ...formSectionKeys),
    autosave: getAutosave(state),
  })),
  reduxForm({
    form: 'wizard',
    forceUnregisterOnUnmount: true,
    onChange: debounce(onChange, 1000, { maxWait: 5000 }),
    onSubmit,
  }),
)(WizardStep)
