import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actions } from 'pubsweet-client'
import { withJournal } from 'xpub-journal'
import { ConnectPage } from 'xpub-connect'
import { selectCollection, selectFragment } from 'xpub-selectors'
import {
  compose,
  withHandlers,
  withState,
  withContext,
  lifecycle,
} from 'recompose'

import Wizard from './Wizard'
import { setAuthors } from '../redux/authors'

export default compose(
  ConnectPage(({ match }) => [
    actions.getCollection({ id: match.params.project }),
    actions.getFragment(
      { id: match.params.project },
      { id: match.params.version },
    ),
  ]),
  connect(
    (state, { match }) => {
      const project = selectCollection(state, match.params.project)
      const version = selectFragment(state, match.params.version)

      return { project, version }
    },
    { setAuthors },
  ),
  withJournal,
  lifecycle({
    componentDidMount() {
      const { version, setAuthors } = this.props
      setAuthors(version.authors, version.id)
    },
  }),
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
