import React from 'react'
import classnames from 'classnames'
import { Icon } from '@pubsweet/ui'

import classes from './FileItem.local.scss'

const FileItem = ({ dragHandle, name, size, removeFile }) => (
  <div className={classnames(classes['file-item'])}>
    {dragHandle}
    <div className={classnames(classes.info)}>
      <span>{name}</span>
      <span>{size}</span>
    </div>
    <div className={classnames(classes.buttons)}>
      <button onClick={removeFile(name)} title="Preview">
        <Icon color="#666">eye</Icon>
      </button>
      <button
        onClick={e => {
          e.preventDefault()
        }}
        title="Download"
      >
        <Icon color="#666">download</Icon>
      </button>
      <button onClick={removeFile(name)} title="Delete">
        <Icon color="#666">trash-2</Icon>
      </button>
    </div>
  </div>
)

export default FileItem
