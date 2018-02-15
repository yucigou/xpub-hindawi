import { get } from 'lodash'
import { withJournal } from 'xpub-journal'
import { login } from 'pubsweet-component-xpub-authentication/src/redux/login'
import { SubmissionError } from 'redux-form'
import { create } from 'pubsweet-client/src/helpers/api'
import { compose, withState, withProps, withHandlers } from 'recompose'

import SignUpInvitation from './SignUpInvitationForm'

const loginUser = (dispatch, values, history) =>
  dispatch(login(values))
    .then(() => {
      history.push('/')
    })
    .catch(error => {
      const err = get(error, 'response')
      if (err) {
        const errorMessage = get(JSON.parse(err), 'error')
        throw new SubmissionError({
          password: errorMessage || 'Something went wrong',
        })
      }
    })

const confirmUser = (email, token) => (values, dispatch, { history }) => {
  const request = { ...values, email, token }
  if (values) {
    return create('/users/invite/password/reset', request)
      .then(r => {
        const { username } = r
        const { password } = values
        loginUser(dispatch, { username, password }, history)
      })
      .catch(error => {
        const err = get(error, 'response')
        if (err) {
          const errorMessage = get(JSON.parse(err), 'error')
          throw new SubmissionError({
            password: errorMessage || 'Something went wrong',
          })
        }
      })
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
