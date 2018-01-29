import React from 'react'
import classnames from 'classnames'
import { Icon } from '@pubsweet/ui'
import { compose, withState, withHandlers } from 'recompose'
import { SortableList } from 'pubsweet-components-faraday/src/components'

import classes from './Files.local.scss'

import FilePicker from './FilePicker'
import FileItem from './FileItem'

const DragHandle = () => (
  <div className={classnames(classes['drag-handle'])}>
    <Icon size={14}>chevron_up</Icon>
    <Icon size={10}>menu</Icon>
    <Icon size={14}>chevron_down</Icon>
  </div>
)

const DropSection = ({
  files,
  title,
  isFirst,
  isLast,
  moveItem,
  addFile,
  removeFile,
}) => (
  <div
    className={classnames({
      [classes['drop-section']]: true,
      [classes['no-border-top']]: !isFirst,
      [classes['dashed-border']]: !isLast,
    })}
  >
    <div className={classnames(classes.header)}>
      <span className={classnames(classes.title)}>{title}</span>
      <FilePicker onUpload={addFile}>
        <div className={classnames(classes['upload-button'])}>
          <Icon>file-plus</Icon>
        </div>
      </FilePicker>
    </div>
    <SortableList
      dragHandle={DragHandle}
      items={files}
      listItem={FileItem}
      moveItem={moveItem}
      removeFile={removeFile}
    />
    <div className={classnames(classes.empty)}>
      <span>Drag items here or use the upload button</span>
    </div>
  </div>
)

const Files = ({ files, addFile, moveItem, removeFile }) => (
  <div className={classnames(classes.container)}>
    <DropSection
      addFile={addFile('main')}
      files={files.main}
      isFirst
      moveItem={moveItem('main')}
      removeFile={removeFile('main')}
      title="Main manuscript"
    />
    <DropSection
      addFile={addFile('supplemental')}
      files={files.supplemental}
      moveItem={moveItem('supplemental')}
      removeFile={removeFile('supplemental')}
      title="Supplemental files"
    />
    <DropSection
      addFile={addFile('letter')}
      files={files.letter}
      isLast
      moveItem={moveItem('letter')}
      removeFile={removeFile('letter')}
      title="Cover letter"
    />
  </div>
)

export default compose(
  withState('files', 'changeFiles', { main: [], supplemental: [], letter: [] }),
  withHandlers({
    addFile: ({ changeFiles }) => type => file => {
      changeFiles(prev => ({
        ...prev,
        [type]: [...prev[type], { name: file.name, size: file.size }],
      }))
    },
    moveItem: ({ changeFiles }) => type => (dragIndex, hoverIndex) => {
      changeFiles(prev => ({
        ...prev,
        [type]: SortableList.moveItem(prev[type], dragIndex, hoverIndex),
      }))
    },
    removeFile: ({ changeFiles }) => type => name => e => {
      e.preventDefault()
      changeFiles(prev => ({
        ...prev,
        [type]: prev[type].filter(f => f.name !== name),
      }))
    },
  }),
)(Files)
