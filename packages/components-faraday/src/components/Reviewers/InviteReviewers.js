import React from 'react'
import { Icon, Button, th } from '@pubsweet/ui'
import { compose, withHandlers } from 'recompose'
import styled, { css, withTheme } from 'styled-components'
import { withModal } from 'pubsweet-component-modal/src/components'

import { ReviewerForm, ReviewersList } from './'

const InviteReviewers = ({ showInviteModal }) => (
  <AssignButton onClick={showInviteModal}>Invite reviewers</AssignButton>
)

const InviteReviewersModal = withTheme(({ theme, hideModal, onConfirm }) => (
  <Root>
    <CloseIcon data-test="icon-modal-hide" onClick={hideModal}>
      <Icon color={theme.colorPrimary}>x</Icon>
    </CloseIcon>

    <Title>Invite Reviewers</Title>

    <Subtitle>Invite reviewer</Subtitle>
    <ReviewerForm />

    <Subtitle>Reviewers Info</Subtitle>
    <ReviewersList />
  </Root>
))

export default compose(
  withModal({
    modalKey: 'invite-reviewers',
    modalComponent: InviteReviewersModal,
  }),
  withHandlers({
    showInviteModal: ({ showModal, hideModal }) => () => {
      showModal({
        onConfirm: () => {
          hideModal()
        },
      })
    },
  }),
)(InviteReviewers)

// #region styled-components
const defaultText = css`
  color: ${th('colorText')};
  font-family: ${th('fontReading')};
  font-size: ${th('fontSizeBaseSmall')};
`

const CloseIcon = styled.div`
  cursor: pointer;
  position: absolute;
  top: ${th('subGridUnit')};
  right: ${th('subGridUnit')};
`

const Subtitle = styled.span`
  ${defaultText};
  align-self: flex-start;
  margin-bottom: ${th('subGridUnit')};
  text-transform: uppercase;
`

const Title = styled.span`
  color: ${th('colorText')};
  font-family: ${th('fontHeading')};
  font-size: ${th('fontSizeHeading5')};
  margin-bottom: ${th('gridUnit')};
`

const Root = styled.div`
  align-items: center;
  background-color: ${th('backgroundColorReverse')};
  display: flex;
  flex-direction: column;
  padding: calc(${th('subGridUnit')} * 6);
  position: relative;
  width: 580px;
`

const AssignButton = styled(Button)`
  ${defaultText};
  align-items: center;
  color: ${th('colorTextReverse')};
  background-color: ${th('colorPrimary')};
  height: calc(${th('subGridUnit')}*5);
  text-align: center;
`
// #endregion
