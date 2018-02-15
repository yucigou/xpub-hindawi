import { get } from 'lodash'
import request, { create } from 'pubsweet-client/src/helpers/api'
import { withJournal } from 'xpub-journal'
import { login } from 'pubsweet-component-xpub-authentication/src/redux/login'
import { SubmissionError } from 'redux-form'
import {
  compose,
  withState,
  withProps,
  withHandlers,
  lifecycle,
} from 'recompose'

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

const confirmUser = (email, token, history) => (values, dispatch) => {
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
    submitConfirmation: ({ email, token, history }) =>
      confirmUser(email, token, history),
  }),
  lifecycle({
    componentDidMount() {
      const { email, token } = this.props
      const encodedUri = `?email=${encodeURIComponent(email)}&token=${token}`
      request(`/users/invite${encodedUri}`).then(res => {
        this.setState({ initialValues: res })
      })
    },
  }),
)(SignUpInvitation)
