import React from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { get, isEmpty } from 'lodash'
import { withJournal } from 'xpub-journal'
import { getFragmentAuthors } from 'pubsweet-components-faraday/src/redux/authors'

const ConfirmationPage = ({ journal, authors = [], location: { state } }) => {
  const email = get(authors.find(a => a.isCorresponding), 'email')
  return (
    <div style={{ width: '70vw', margin: '0 auto' }}>
      {isEmpty(state) ? (
        <h2>Thank you for you submission</h2>
      ) : (
        <div>
          <h2>Thank You for Submitting Your Manuscript</h2>
          <p>
            Your manuscript has been successfully submitted to{' '}
            {journal.metadata.name}.
          </p>
          <p>
            An acknowledgement email will be sent to{' '}
            <a href={`mailto:${email}`}>{email}</a> when our system has finished
            processing the submission. At that point, you will be able to track
            the status of your submission. Please note, this may take a few
            minutes.
          </p>
          <p>
            Click{' '}
            <a
              href={`/projects/${state.project}/versions/${
                state.version
              }/manuscript`}
            >
              {' '}
              here{' '}
            </a>{' '}
            to return to your account in the Manuscript Tracking System.
          </p>
        </div>
      )}
    </div>
  )
}

export default compose(
  withJournal,
  connect((state, { location: { state: locationState } }) => ({
    authors: getFragmentAuthors(state, get(locationState, 'version')),
  })),
)(ConfirmationPage)
