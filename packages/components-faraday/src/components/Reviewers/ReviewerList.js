import React from 'react'
import { th, Icon } from '@pubsweet/ui'
import { compose, withHandlers } from 'recompose'
import styled, { withTheme } from 'styled-components'

const defaultReviewers = [
  {
    email: 'sebi1@morti.com',
    name: 'Sebi Mih',
    status: 'accepted',
    lastUpdated: '12-12-2020',
  },
  {
    email: 'sebi2@morti.com',
    name: 'Sebi Mih 1',
    status: 'accepted',
    lastUpdated: '12-12-2020',
  },
  {
    email: 'sebi3@morti.com',
    name: 'Sebi Mih 2',
    status: 'accepted',
    lastUpdated: '12-12-2020',
  },
  {
    email: 'sebi4@morti.com',
    name: 'Sebi Mih 3',
    status: 'accepted',
    lastUpdated: '12-12-2020',
  },
  {
    email: 'sebi5@morti.com',
    name: 'Sebi Mih 4',
    status: 'accepted',
    lastUpdated: '12-12-2020',
  },
  {
    email: 'sebi6@morti.com',
    name: 'Sebi Mih 5',
    status: 'accepted',
    lastUpdated: '12-12-2020',
  },
]

const ResendRevoke = withTheme(
  ({ theme, showConfirmResend, showConfirmRevoke }) => (
    <ActionButtons>
      <div onClick={showConfirmResend}>
        <Icon color={theme.colorPrimary}>refresh-cw</Icon>
      </div>
      <div onClick={showConfirmRevoke}>
        <Icon color={theme.colorPrimary}>x-circle</Icon>
      </div>
    </ActionButtons>
  ),
)

const ReviewersList = ({
  reviewers = defaultReviewers,
  showConfirmResend,
  showConfirmRevoke,
}) => (
  <Root>
    <ScrollContainer>
      {reviewers.map((r, index, arr) => (
        <ReviewerItem isLast={index === arr.length - 1} key={r.email}>
          <Column flex={3}>
            <div>
              <ReviewerName>{r.name}</ReviewerName>
              {r.status === 'accepted' && (
                <AcceptedReviewer>{`Reviewer ${index + 1}`}</AcceptedReviewer>
              )}
            </div>
            <ReviewerEmail>{r.email}</ReviewerEmail>
          </Column>
          <Column>
            <StatusText>{r.status}</StatusText>
            <StatusText>{r.lastUpdated}</StatusText>
          </Column>
          <ResendRevoke
            showConfirmResend={showConfirmResend}
            showConfirmRevoke={showConfirmRevoke}
          />
        </ReviewerItem>
      ))}
    </ScrollContainer>
  </Root>
)

export default compose(
  withHandlers({
    goBackToReviewers: ({ showModal, hideModal }) => () => {
      showModal({
        type: 'invite-reviewers',
        onConfirm: () => {
          hideModal()
        },
      })
    },
  }),
  withHandlers({
    showConfirmResend: ({ showModal, goBackToReviewers }) => () => {
      showModal({
        title: 'Resend confirmation',
        onConfirm: goBackToReviewers,
        onCancel: goBackToReviewers,
      })
    },
    showConfirmRevoke: ({ showModal, hideModal, goBackToReviewers }) => () => {
      showModal({
        title: 'Revoke confirmation',
        onConfirm: goBackToReviewers,
        onCancel: goBackToReviewers,
      })
    },
  }),
)(ReviewersList)

// #region styled-components
const ReviewerEmail = styled.span`
  font-size: ${th('fontSizeBaseSmall')};
  color: ${th('colorPrimary')};
  font-family: ${th('fontReading')};
`

const ReviewerName = ReviewerEmail.extend`
  font-size: ${th('fontSizeBase')};
  text-decoration: underline;
`

const AcceptedReviewer = ReviewerEmail.extend`
  font-weight: bold;
  margin-left: ${th('subGridUnit')};
`

const StatusText = ReviewerEmail.extend``

const Column = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: ${({ flex }) => flex || 1};
`

const ReviewerItem = styled.div`
  align-items: center;
  border-bottom: ${({ isLast }) => (isLast ? 'none' : th('borderDefault'))};
  display: flex;
  justify-content: space-between;
  padding: ${th('subGridUnit')} calc(${th('subGridUnit')} * 2);

  &:hover {
    background-color: ${th('colorSecondary')};
  }
`

const ActionButtons = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: space-evenly;
  opacity: 0;

  div {
    cursor: pointer;
  }

  ${ReviewerItem}:hover & {
    opacity: 1;
  }
`

const ScrollContainer = styled.div`
  align-self: stretch;
  flex: 1;
  overflow: auto;
`
const Root = styled.div`
  align-items: stretch;
  align-self: stretch;
  background-color: ${th('backgroundColorReverse')};
  border: ${th('borderDefault')};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 25vh;
`
// #endregion
