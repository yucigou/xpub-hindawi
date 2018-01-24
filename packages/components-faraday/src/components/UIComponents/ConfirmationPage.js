import React from 'react'
import classnames from 'classnames'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { Button } from '@pubsweet/ui'
import { get, isEmpty } from 'lodash'
import { withJournal } from 'xpub-journal'
import { getFragmentAuthors } from 'pubsweet-components-faraday/src/redux/authors'

import classes from './UIComponents.local.scss'

const ConfirmationPage = ({
  journal,
  authors = [],
  location: { state },
  history,
}) => {
  const email = get(authors.find(a => a.isCorresponding), 'email')
  return (
    <div className={classnames(classes.container)}>
      {isEmpty(state) ? (
        <h2>Thank you for you submission</h2>
      ) : (
        <div>
          <h2>Thank You for Submitting Your Manuscript</h2>
          <p>
            Your manuscript has been successfully submitted to{' '}
            <b>{journal.metadata.nameText}</b> and assigned the manuscript ID{' '}
            <b>
              {' '}
              <a
                href={`/projects/${state.project}/versions/${
                  state.version
                }/manuscript`}
              >
                {state.project}
              </a>
            </b>.
          </p>
          <p>
            An acknowledgement email will be sent to {email} when our system has
            finished processing the submission. At that point, you will be able
            to track the status of your submission. Please note, this may take a
            few minutes.
          </p>
          <p>
            {`You can keep track of your submission's progress on your dashboard.`}
          </p>
          <Button onClick={() => history.push('/')} primary>
            Go to Dashboard
          </Button>
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
