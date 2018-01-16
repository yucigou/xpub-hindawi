import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { debounce, pick } from 'lodash'
import { actions } from 'pubsweet-client'
import { reduxForm, formValueSelector } from 'redux-form'
import { compose, getContext, withProps } from 'recompose'

import WizardStep from './WizardStep'

const wizardSelector = formValueSelector('wizard')

const onChange = (values, dispatch, { project, version }) => {
  dispatch(
    actions.updateFragment(project, {
      id: version.id,
      rev: version.rev,
      ...values,
    }),
  )
}

export default compose(
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
  connect((state, { wizard: { formSectionKeys } }) => ({
    formValues: formSectionKeys.reduce(
      (acc, el) => ({
        ...acc,
        [el]: wizardSelector(state, el),
      }),
      {},
    ),
  })),
  reduxForm({
    form: 'wizard',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    onSubmit: (values, dispatch, { nextStep, isFinal }) => {
      if (!isFinal) {
        nextStep()
      }
    },
    onChange: debounce(onChange, 1000, { maxWait: 5000 }),
  }),
)(WizardStep)
