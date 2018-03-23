import React from 'react'
import { compose, withHandlers } from 'recompose'
import { withModal } from 'pubsweet-component-modal/src/components'

import HEModal from './AssignHEModal'

const AssignEditor = ({ assign }) => <button onClick={assign}>ASSIGN</button>

export default compose(
  withModal({
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
