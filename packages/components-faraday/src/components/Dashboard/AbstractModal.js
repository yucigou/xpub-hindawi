import React from 'react'
import { get } from 'lodash'
import Modal from 'react-modal'
import { Icon } from '@pubsweet/ui'
import styled from 'styled-components'

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(102, 112, 128, 0.8)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    maxHeight: 500,
    padding: 0,
    overflowY: 'auto',
    opacity: 1,
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: 0,
  },
}

// #region styled-components
const Root = styled.div`
  background-color: #fff;
  padding: 50px 32px 32px 32px;
  border: 1px solid #667080;
  position: relative;
`

const Title = styled.div`
  font-family: Helvetica;
  font-size: 18px;
  text-align: left;
  color: #667080;
`

const Subtitle = styled.div`
  color: #667080;
  font-family: Helvetica;
  font-size: 14px;
  font-weight: bold;
  line-height: 1.57;
  margin-bottom: 8px;
  text-align: left;
`

const Content = styled.div`
  color: #667080;
  font-family: Helvetica;
  font-size: 14px;
  line-height: 1.57;
  margin-top: 10px;
  text-align: left;
`

const CloseIcon = styled.div`
  cursor: pointer;
  position: absolute;
  top: 5px;
  right: 5px;
`
// #endregion

const AbstractModal = ({ abstractModal, onClose }) => {
  const isOpen = !!abstractModal
  return (
    <Modal
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick
      style={customStyles}
    >
      <Root>
        <CloseIcon onClick={onClose}>
          <Icon color="#667080">x</Icon>
        </CloseIcon>
        <Title
          dangerouslySetInnerHTML={{ __html: get(abstractModal, 'title') }}
        />
        <Subtitle>Abstract</Subtitle>
        <Content
          dangerouslySetInnerHTML={{ __html: get(abstractModal, 'abstract') }}
        />
      </Root>
    </Modal>
  )
}

export default AbstractModal
