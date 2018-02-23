import React from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { Button } from '@pubsweet/ui'
import { get, isEmpty } from 'lodash'
import { withJournal } from 'xpub-journal'
import styled from 'styled-components'
import { getFragmentAuthors } from 'pubsweet-components-faraday/src/redux/authors'

const ConfirmationPage = ({
  journal,
  authors = [],
  location: { state },
  history,
}) => {
  const email = get(authors.find(a => a.isCorresponding), 'email')
  return (
    <Root>
      {isEmpty(state) ? (
        <div>
          <Title>Thank you for you submission</Title>
          <Button onClick={() => history.push('/')} primary>
            Go to Dashboard
          </Button>
        </div>
      ) : (
        <div>
          <Title>Thank You for Submitting Your Manuscript</Title>
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
    </Root>
  )
}

export default compose(
  withJournal,
  connect((state, { location: { state: locationState } }) => ({
    authors: getFragmentAuthors(state, get(locationState, 'version')),
  })),
)(ConfirmationPage)

// #region styles

const Root = styled.div`
  margin: 0 auto;
  text-align: center;
  width: 70vw;
  color: ${({ theme }) => theme.colorText};

  a {
    color: ${({ theme }) => theme.colorText};
  }
`

const Title = styled.div`
  font-size: ${({ theme }) => theme.fontSizeHeading5};
  font-family: ${({ theme }) => theme.fontHeading};
  color: ${({ theme }) => theme.colorPrimary};
  margin: 10px auto;
`
// #endregion
