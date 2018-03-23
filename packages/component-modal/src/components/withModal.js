import React from 'react'
import { omit } from 'lodash'
import { connect } from 'react-redux'

import Modal from './Modal'
import { showModal, hideModal } from '../redux/modal'

const mapState = state => ({
  modalsVisibility: omit(state.modal, 'props'),
  modalProps: state.modal.props,
})

const mapDispatch = modalKey => (dispatch, propss) => ({
  hideModal: () => dispatch(hideModal()),
  showModal: (modalProps = {}) => dispatch(showModal(modalKey, modalProps)),
})

const withModal = ({
  modalKey,
  modalComponent: Component,
  overlayColor,
}) => WrappedComponent =>
  connect(mapState, mapDispatch(modalKey))(
    ({ modalsVisibility, modalProps, hideModal, ...rest }) => (
      <React.Fragment>
        {modalsVisibility[modalKey] && (
          <Modal
            {...modalProps}
            component={Component}
            hideModal={hideModal}
            overlayColor={overlayColor}
          />
        )}
        <WrappedComponent hideModal={hideModal} {...rest} />
      </React.Fragment>
    ),
  )

export default withModal
