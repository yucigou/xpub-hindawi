import React from 'react'
import { get, head } from 'lodash'
import { connect } from 'react-redux'
import { actions } from 'pubsweet-client'
import { Icon, Button, th } from '@pubsweet/ui'
import { compose, withHandlers } from 'recompose'
import styled, { css, withTheme } from 'styled-components'
import {
  withModal,
  ConfirmationModal,
  SuccessModal,
} from 'pubsweet-component-modal/src/components'

import { revokeHandlingEditor, assignHandlingEditor } from '../../redux/editors'

import HEModal from './AssignHEModal'

const HandlingEditorActions = ({
  project,
  theme,
  getHandlingEditor,
  showConfirmModal,
  showHEModal,
}) => {
  const handlingEditor = getHandlingEditor()
  return (
    <Root>
      <HEActions>
        {handlingEditor ? (
          <HEActions>
            <HEName>{get(handlingEditor, 'name')}</HEName>
            {!handlingEditor.hasAnswer && (
              <HEActions>
                <div onClick={showConfirmModal('resend')}>
                  <Icon color={theme.colorPrimary}>refresh-cw</Icon>
                </div>
                <div onClick={showConfirmModal('cancel')}>
                  <Icon color={theme.colorPrimary}>x-circle</Icon>
                </div>
              </HEActions>
            )}
          </HEActions>
        ) : (
          <AssignButton onClick={showHEModal}>Assign</AssignButton>
        )}
      </HEActions>
    </Root>
  )
}

const CardModal = ({ type, ...rest }) => {
  switch (type) {
    case 'confirmation':
      return <ConfirmationModal {...rest} />
    case 'success':
      return <SuccessModal {...rest} />
    case 'he-modal':
    default:
      return <HEModal {...rest} />
  }
}

const handleError = fn => e => {
  fn(get(JSON.parse(e.response), 'error') || 'Oops! Something went wrong!')
}

export default compose(
  connect(null, {
    revokeHandlingEditor,
    assignHandlingEditor,
    updateCollection: actions.updateCollection,
    getCollections: actions.getCollections,
  }),
  withTheme,
  withModal({
    modalKey: 'confirmHE',
    modalComponent: CardModal,
  }),
  withHandlers({
    getHandlingEditor: ({ project }) => () => {
      const assignedEditors = get(project, 'assignedPeople')
      if (assignedEditors && assignedEditors.length) {
        return head(
          assignedEditors.filter(
            editor =>
              !editor.hasAnswer || (editor.hasAnswer && editor.isAccepted),
          ),
        )
      }
      return null
    },
  }),
  withHandlers({
    showConfirmModal: ({
      showModal,
      project,
      revokeHandlingEditor,
      assignHandlingEditor,
      getHandlingEditor,
      hideModal,
      setModalError,
      updateCollection,
      getCollections,
    }) => actionType => {
      const editor = getHandlingEditor()
      const resendConfig = {
        title: 'Resend Invitation?',
        subtitle: '',
        confirmText: 'Resend',
        onConfirm: () =>
          assignHandlingEditor(get(editor, 'email'), project.id, true).then(
            () => {
              hideModal()
              showModal({
                type: 'success',
                title: 'Invite resent',
              })
            },
            handleError(setModalError),
          ),
      }
      const revokeConfig = {
        title: 'Revoke Handling Editor Assignation?',
        subtitle: `Clicking 'Revoke' will allow you to invite a different person.`,
        confirmText: 'Revoke invite',
        onConfirm: () =>
          revokeHandlingEditor(get(editor, 'id'), project.id).then(() => {
            updateCollection({
              id: project.id,
              status: 'submitted',
            }).then(() => {
              getCollections()
              hideModal()
              showModal({
                type: 'success',
                title: 'Handling Editor Assignation Revoked',
              })
            })
          }, handleError(setModalError)),
      }

      return () => {
        const cfg = actionType === 'resend' ? resendConfig : revokeConfig
        showModal({ ...cfg, type: 'confirmation' })
      }
    },
    showHEModal: ({ showModal, project }) => () => {
      showModal({ type: 'he-modal', collectionId: project.id, showModal })
    },
  }),
)(HandlingEditorActions)

// #region styled-components
const defaultText = css`
  color: ${th('colorText')};
  font-family: ${th('fontReading')};
  font-size: ${th('fontSizeBaseSmall')};
`

const Root = styled.div`
  margin-left: ${th('gridUnit')};
`

const HEName = styled.div``

const HEActions = styled.div`
  ${defaultText};
  text-transform: uppercase;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: ${th('subGridUnit')};
  span {
    margin-left: ${th('subGridUnit')};
    &:hover {
      svg {
        opacity: 0.8;
      }
    }
  }
`

const AssignButton = styled(Button)`
  ${defaultText};
  align-items: center;
  background-color: ${th('colorPrimary')};
  color: ${th('colorTextReverse')};
  text-align: center;
  height: calc(${th('subGridUnit')}*5);
`
// #endregion
