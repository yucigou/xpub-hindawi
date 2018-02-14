import { withJournal } from 'xpub-journal'
import { compose, withState, withProps, withHandlers } from 'recompose'

import SignUpInvitation from './SignUpInvitationForm'

export default compose(
  withJournal,
  withState('step', 'changeStep', 0),
  withHandlers({
    nextStep: ({ changeStep }) => () => changeStep(step => step + 1),
    prevStep: ({ changeStep }) => () => changeStep(step => step - 1),
    submitConfirmation: () => values => values,
  }),
  withProps(({ location }) => {
    const params = new URLSearchParams(location.search)
    const email = params.get('email')
    const token = params.get('token')
    return { email, token }
  }),
)(SignUpInvitation)
