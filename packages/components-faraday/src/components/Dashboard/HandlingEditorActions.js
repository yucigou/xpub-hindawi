import React from 'react'
import { connect } from 'react-redux'
import { actions } from 'pubsweet-client'
import { th, Button } from '@pubsweet/ui'
import styled, { css } from 'styled-components'
import { withHandlers, compose, withState } from 'recompose'
import {
  withModal,
  ConfirmationModal,
} from 'pubsweet-component-modal/src/components'

import { handleError } from './../utils'
import { handlingEditorDecision } from '../../redux/editors'

const DeclineModal = compose(
  withState('reason', 'setReason', ''),
  withHandlers({
    changeReason: ({ setReason }) => e => {
      setReason(e.target.value)
    },
  }),
)(({ reason, changeReason, hideModal, onConfirm }) => (
  <DeclineRoot>
    <span>Decline handling editor role</span>
    <textarea
      onChange={changeReason}
      placeholder="Decline reason (optional)"
      value={reason}
    />
    <div data-test="he-buttons">
      <Button onClick={hideModal}>Cancel</Button>
      <Button onClick={onConfirm(reason)} primary>
        Decline
      </Button>
    </div>
  </DeclineRoot>
))

const ModalComponent = ({ type, ...rest }) =>
  type === 'decline' ? (
    <DeclineModal {...rest} />
  ) : (
    <ConfirmationModal {...rest} />
  )

const HandlingEditorActions = ({ showHEModal }) => (
  <Root>
    <DecisionButton onClick={showHEModal('decline')}>DECLINE</DecisionButton>
    <DecisionButton onClick={showHEModal()} primary>
      AGREE
    </DecisionButton>
  </Root>
)

export default compose(
  connect(null, {
    getCollections: actions.getCollections,
    updateCollection: actions.updateCollection,
  }),
  withModal({
    modalKey: 'he-action',
    modalComponent: ModalComponent,
  }),
  withHandlers({
    showHEModal: ({
      showModal,
      hideModal,
      project,
      getCollections,
      updateCollection,
      setModalError,
    }) => modalType => {
      const agreeConfig = {
        type: modalType,
        title: 'Agree to handling editor assignment',
        subtitle: `Clicking "Agree" will assign you as Handling Editor for this Manuscript.`,
        onConfirm: () => {
          handlingEditorDecision(project.id, true).then(() => {
            updateCollection({
              id: project.id,
              status: 'under-review',
            }).then(() => {
              getCollections()
              hideModal()
            })
          }, handleError(setModalError))
        },
      }
      const declineConfig = {
        type: modalType,
        title: 'Decline handling editor role',
        subtitle: `Clicking "Agree" will assign you as Handling Editor for this Manuscript.`,
        onConfirm: reason => () => {
          handlingEditorDecision(project.id, false, reason).then(() => {
            updateCollection({
              id: project.id,
              status: 'submitted',
            }).then(() => {
              getCollections()
              hideModal()
            })
          }, handleError(setModalError))
        },
      }
      return () => {
        const cfg = modalType === 'decline' ? declineConfig : agreeConfig
        showModal(cfg)
      }
    },
  }),
)(HandlingEditorActions)

// #region styled-components
const defaultText = css`
  font-family: ${th('fontReading')};
  font-size: ${th('fontSizeBaseSmall')};
`

const DecisionButton = styled(Button)`
  ${defaultText};
  align-items: center;
  color: ${({ primary }) =>
    primary ? th('colorTextReverse') : th('colorPrimary')});
  background-color: ${({ primary }) =>
    primary ? th('colorPrimary') : th('backgroundColorReverse')};
  height: calc(${th('subGridUnit')}*5);
  text-align: center;
`

const DeclineRoot = styled.div`
  align-items: center;
  background-color: ${th('backgroundColor')};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(${th('gridUnit')} * 13);
  padding: calc(${th('subGridUnit')} * 7);
  width: calc(${th('gridUnit')} * 24);

  & span {
    color: ${th('colorPrimary')};
    font-size: ${th('fontSizeHeading5')};
    font-family: ${th('fontHeading')};
    margin-bottom: 25px;
  }

  & textarea {
    height: 100%;
    padding: calc(${th('subGridUnit')} * 2);
    width: 100%;
  }

  & textarea:focus,
  & textarea:active {
    outline: none;
  }

  & div {
    display: flex;
    justify-content: space-evenly;
    margin: ${th('gridUnit')} auto 0;
    width: 100%;
  }
`

const Root = styled.div`
  margin-left: ${th('gridUnit')};
`
// #endregion
