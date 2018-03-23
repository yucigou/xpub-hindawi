import React from 'react'
import styled, { css } from 'styled-components'
import { Button, th } from '@pubsweet/ui'
import { compose, withHandlers } from 'recompose'
import { withModal } from 'pubsweet-component-modal/src/components'

import HEModal from './AssignHEModal'

const AssignEditor = ({ assign }) => (
  <ActionButtons onClick={assign}>ASSIGN</ActionButtons>
)

export default compose(
  withModal({
    modalKey: 'assignHEmodal',
    modalComponent: HEModal,
  }),
  withHandlers({
    assign: ({ showModal, collectionId }) => () => {
      showModal({
        collectionId,
      })
    },
  }),
)(AssignEditor)

// #region styled-components
const defaultText = css`
  color: ${th('colorText')};
  font-family: ${th('fontReading')};
  font-size: ${th('fontSizeBaseSmall')};
`

const ActionButtons = styled(Button)`
  ${defaultText};
  align-items: center;
  background-color: ${th('colorPrimary')};
  color: ${th('colorTextReverse')};
  text-align: center;
  height: calc(${th('subGridUnit')}*5);
`
// #endregion
