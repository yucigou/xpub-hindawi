import React from 'react'
import { connect } from 'react-redux'

import Modal from './Modal'
import { setModalVisibility } from '../redux/modal'

const mapState = state => ({
  modalVisible: state.modal.visible,
  modalProps: state.modal.props,
})

const mapDispatch = dispatch => ({
  hideModal: () => dispatch(setModalVisibility(false)),
  showModal: (modalProps = {}) =>
    dispatch(setModalVisibility(true, modalProps)),
})

const withModal = ({
  modalComponent: Component,
  overlayColor,
}) => WrappedComponent =>
  connect(mapState, mapDispatch)(
    ({ modalVisible, modalProps, hideModal, ...rest }) => (
      <div>
        {modalVisible && (
          <Modal
            {...modalProps}
            component={Component}
            hideModal={hideModal}
            overlayColor={overlayColor}
          />
        )}
        <WrappedComponent hideModal={hideModal} {...rest} />
      </div>
    ),
  )

export default withModal
