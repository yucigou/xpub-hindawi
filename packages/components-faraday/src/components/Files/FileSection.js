import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Icon } from '@pubsweet/ui'
import { DropTarget } from 'react-dnd'
import { NativeTypes } from 'react-dnd-html5-backend'
import { compose, getContext, withHandlers, withState } from 'recompose'
import {
  SortableList,
  Spinner,
} from 'pubsweet-components-faraday/src/components'

import FileItem from './FileItem'
import FilePicker from './FilePicker'
import classes from './FileSection.local.scss'

const DragHandle = () => (
  <div className={classnames(classes['drag-handle'])}>
    <Icon size={14}>chevron_up</Icon>
    <Icon size={10}>menu</Icon>
    <Icon size={14}>chevron_down</Icon>
  </div>
)

const FileSection = ({
  error,
  title,
  files,
  listId,
  isOver,
  isLast,
  isFirst,
  addFile,
  canDrop,
  moveItem,
  isFileOver,
  removeFile,
  connectFileDrop,
  connectDropTarget,
  allowedFileExtensions,
  isFetching,
  canDropFile,
  disabledFilepicker,
  dropSortableFile,
  previewFile,
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
          <div className={classnames(classes['picker-container'])}>
            <span className={classnames(classes.title)}>{title}</span>
            {!isFetching[listId] ? (
              <FilePicker
                allowedFileExtensions={allowedFileExtensions}
                disabled={disabledFilepicker()}
                onUpload={addFile}
              >
                <div
                  className={classnames({
                    [classes['upload-button']]: true,
                    [classes['disabled-picker']]: disabledFilepicker(),
                  })}
                >
                  <Icon color={disabledFilepicker() ? '#999' : '#333'}>
                    file-plus
                  </Icon>
                </div>
              </FilePicker>
            ) : (
              <Spinner />
            )}
          </div>
          <span className={classnames(classes.error)}>{error}</span>
        </div>
        <SortableList
          beginDragProps={['id', 'index', 'name', 'listId']}
          dragHandle={DragHandle}
          dropItem={dropSortableFile}
          items={files}
          listId={listId}
          listItem={FileItem}
          moveItem={moveItem}
          previewFile={previewFile}
          removeFile={removeFile}
        />
        <div className={classnames(classes.dropzone)}>
          <span>Drag files here or use the add button.</span>
        </div>
      </div>,
    ),
  )

export default compose(
  getContext({
    isFetching: PropTypes.object,
  }),
  withState('error', 'setError', ''),
  withHandlers({
    clearError: ({ setError }) => () => {
      setError(e => '')
    },
  }),
  withHandlers({
    setError: ({ setError, clearError }) => err => {
      setError(e => err, () => setTimeout(clearError, 3000))
    },
    disabledFilepicker: ({ files, maxFiles }) => () => files.length >= maxFiles,
  }),
  DropTarget(
    'item',
    {
      drop(
        {
          changeList,
          listId: toListId,
          maxFiles,
          files,
          setError,
          allowedFileExtensions,
        },
        monitor,
      ) {
        const { listId: fromListId, id, name } = monitor.getItem()
        const fileExtention = name.split('.')[1]

        if (
          allowedFileExtensions &&
          !allowedFileExtensions.includes(fileExtention)
        ) {
          setError('Invalid file type.')
          return
        }

        if (files.length >= maxFiles) {
          setError('No more files can be added to this section.')
          return
        }
        if (toListId === fromListId) return
        changeList(fromListId, toListId, id)
      },
      canDrop({ listId: toListId, setError }, monitor) {
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
      drop(
        { files, maxFiles, addFile, allowedFileExtensions, setError },
        monitor,
      ) {
        const [file] = monitor.getItem().files
        const fileExtention = file.name.split('.')[1]

        if (files.length >= maxFiles) {
          setError('No more files can be added to this section.')
          return
        }

        if (
          allowedFileExtensions &&
          allowedFileExtensions.includes(fileExtention)
        ) {
          addFile(file)
        } else {
          setError('Invalid file type.')
        }
      },
    },
    (connect, monitor) => ({
      connectFileDrop: connect.dropTarget(),
      isFileOver: monitor.isOver(),
      canDropFile: monitor.canDrop(),
    }),
  ),
)(FileSection)
