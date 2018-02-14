import { withJournal } from 'xpub-journal'
import { create } from 'pubsweet-client/src/helpers/api'
import { compose, withState, withProps, withHandlers } from 'recompose'

import SignUpInvitation from './SignUpInvitationForm'

const confirmUser = (email, token) => (values, dispatch, { history }) => {
  const request = { ...values, email, token }
  if (values) {
    create('/users/invite/password/reset', request).then(
      r => history.push('/'),
      // err => console.log(err),
    )
  }
}

export default compose(
  withJournal,
  withState('step', 'changeStep', 0),
  withProps(({ location }) => {
    const params = new URLSearchParams(location.search)
    const email = params.get('email')
    const token = params.get('token')
    return { email, token }
  }),
  withHandlers({
    nextStep: ({ changeStep }) => () => changeStep(step => step + 1),
    prevStep: ({ changeStep }) => () => changeStep(step => step - 1),
    submitConfirmation: ({ email, token }) => confirmUser(email, token),
  }),
)(SignUpInvitation)
