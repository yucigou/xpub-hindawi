import React from 'react'
import classnames from 'classnames'

import classes from './FileDropzone.local.scss'

const FileDropzone = ({ label }) => (
  <div className={classnames(classes.dropzone)}>
    <span>{label}</span>
  </div>
)

export default FileDropzone
