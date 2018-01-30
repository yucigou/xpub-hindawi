import React from 'react'
import classnames from 'classnames'

import classes from './FileDropzone.local.scss'

const FileDropzone = ({ ...props }) => (
  <div className={classnames(classes.dropzone)}>
    <span>Drag items here or use the upload button</span>
  </div>
)

// export default compose(
//   DropTarget(
//     'item',
//     {
//       drop(props) {
//         console.log('s-a dat drop', props)
//       },
//     },
//     (connect, monitor) => ({
//       connectDropTarget: connect.dropTarget(),
//     }),
//   ),
// )(FileDropzone)

export default FileDropzone
