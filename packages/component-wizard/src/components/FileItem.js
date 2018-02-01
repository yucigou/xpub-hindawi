import React from 'react'
import classnames from 'classnames'
import { Icon } from '@pubsweet/ui'

import classes from './FileItem.local.scss'

const parseFileSize = size => {
  const kbSize = size / 1000
  const mbSize = kbSize / 1000
  const gbSize = mbSize / 1000

  if (Math.floor(gbSize)) {
    return `${Math.floor(gbSize)} GB`
  } else if (Math.floor(mbSize)) {
    return `${Math.floor(mbSize)} MB`
  } else if (Math.floor(kbSize)) {
    return `${Math.floor(kbSize)} kB`
  }
  return `${size} bytes`
}

const FileItem = ({
  dragHandle,
  name,
  size,
  id,
  removeFile,
  previewFile,
  ...rest
}) => (
  <div className={classnames(classes['file-item'])}>
    {dragHandle}
    <div className={classnames(classes.info)}>
      <span>{name}</span>
      <span>{parseFileSize(size)}</span>
    </div>
    <div className={classnames(classes.buttons)}>
      <button onClick={previewFile(id)}>
        <Icon color="#666">eye</Icon>
      </button>
      <button onClick={removeFile(id)} title="Delete">
        <Icon color="#666">trash-2</Icon>
      </button>
    </div>
  </div>
)

export default FileItem
