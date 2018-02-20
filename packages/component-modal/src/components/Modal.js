import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

const createModalRootElement = () => {
  const modalDiv = document.createElement('div')
  modalDiv.setAttribute('id', 'ps-modal-root')
  document.body.insertAdjacentElement('beforeend', modalDiv)

  return modalDiv
}

const modalRoot = createModalRootElement()

class Modal extends React.Component {
  render() {
    const { component: Component, overlayColor, ...rest } = this.props
    return ReactDOM.createPortal(
      <ModalRoot
        onClick={rest.dismissable ? rest.hideModal : null}
        overlayColor={overlayColor}
      >
        <Component {...rest} />
      </ModalRoot>,
      modalRoot,
    )
  }
}

export default Modal

const ModalRoot = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ overlayColor }) =>
    overlayColor || 'rgba(0, 0, 0, 0.8)'};
`
