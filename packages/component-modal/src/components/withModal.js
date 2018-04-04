import React from 'react'
import { omit } from 'lodash'
import { connect } from 'react-redux'

import Modal from './Modal'
import { showModal, hideModal, setModalError } from '../redux/modal'

const mapState = state => ({
  modalsVisibility: omit(state.modal, 'props'),
  modalProps: state.modal.props,
  modalError: state.modal.error,
})

const mapDispatch = modalKey => (dispatch, propss) => ({
  hideModal: () => dispatch(hideModal()),
  showModal: (modalProps = {}) => dispatch(showModal(modalKey, modalProps)),
  setModalError: errorMessage => dispatch(setModalError(errorMessage)),
})

const withModal = ({
  modalKey,
  modalComponent: Component,
  overlayColor,
}) => WrappedComponent =>
  connect(mapState, mapDispatch(modalKey))(
    ({
      modalsVisibility,
      modalProps,
      modalError,
      hideModal,
      showModal,
      setModalError,
      ...rest
    }) => (
      <React.Fragment>
        {modalsVisibility[modalKey] && (
          <Modal
            {...modalProps}
            component={Component}
            hideModal={hideModal}
            modalError={modalError}
            overlayColor={overlayColor}
            setModalError={setModalError}
            showModal={showModal}
          />
        )}
        <WrappedComponent
          hideModal={hideModal}
          setModalError={setModalError}
          showModal={showModal}
          {...rest}
        />
      </React.Fragment>
    ),
  )

export default withModal
