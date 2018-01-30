import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Icon } from '@pubsweet/ui'
import { DropTarget } from 'react-dnd'
import { compose, getContext } from 'recompose'
import { NativeTypes } from 'react-dnd-html5-backend'
import { SortableList } from 'pubsweet-components-faraday/src/components'

import FileItem from './FileItem'
import FilePicker from './FilePicker'
import FileDropzone from './FileDropzone'
import classes from './FileSection.local.scss'

const DragHandle = () => (
  <div className={classnames(classes['drag-handle'])}>
    <Icon size={14}>chevron_up</Icon>
    <Icon size={10}>menu</Icon>
    <Icon size={14}>chevron_down</Icon>
  </div>
)

const FileSection = ({
  title,
  files,
  listId,
  isOver,
  isLast,
  isFirst,
  addFile,
  canDrop,
  dropItems,
  moveItem,
  isFileOver,
  removeFile,
  connectFileDrop,
  connectDropTarget,
  allowedFileExtensions,
  isFetching,
}) =>
  connectFileDrop(
    connectDropTarget(
      <div
        className={classnames({
          [classes['drop-section']]: true,
          [classes['no-border-top']]: !isFirst,
          [classes['dashed-border']]: !isLast,
          [classes['is-over']]: isFileOver || (isOver && canDrop),
        })}
      >
        <div className={classnames(classes.header)}>
          <span className={classnames(classes.title)}>{title}</span>
          {!isFetching[listId] ? (
            <FilePicker
              allowedFileExtensions={allowedFileExtensions}
              onUpload={addFile}
            >
              <div className={classnames(classes['upload-button'])}>
                <Icon>file-plus</Icon>
              </div>
            </FilePicker>
          ) : (
            <div className={classnames(classes.rotate, classes.icon)}>
              <Icon size={16}>loader</Icon>
            </div>
          )}
        </div>
        <SortableList
          beginDragProps={['id', 'index', 'name', 'listId']}
          dragHandle={DragHandle}
          dropItem={dropItems}
          items={files}
          listId={listId}
          listItem={FileItem}
          moveItem={moveItem}
          removeFile={removeFile}
        />
        <FileDropzone />
      </div>,
    ),
  )

export default compose(
  getContext({
    isFetching: PropTypes.object,
  }),
  DropTarget(
    'item',
    {
      drop({ changeList, listId: toListId }, monitor) {
        const { listId: fromListId, id } = monitor.getItem()
        if (toListId === fromListId) return
        changeList(fromListId, toListId, id)
      },
      canDrop({ listId: toListId }, monitor) {
        const { listId: fromListId } = monitor.getItem()
        return toListId !== fromListId
      },
    },
    (connect, monitor) => ({
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  ),
  DropTarget(
    NativeTypes.FILE,
    {
      drop({ addFile, allowedFileExtensions }, monitor) {
        const [file] = monitor.getItem().files
        const fileExtention = file.name.split('.')[1]

        if (allowedFileExtensions.includes(fileExtention)) {
          addFile(file)
        }
      },
    },
    (connect, monitor) => ({
      connectFileDrop: connect.dropTarget(),
      isFileOver: monitor.isOver(),
    }),
  ),
)(FileSection)
