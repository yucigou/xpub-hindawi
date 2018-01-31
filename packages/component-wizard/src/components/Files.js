import React from 'react'
import { get } from 'lodash'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  compose,
  withHandlers,
  getContext,
  lifecycle,
  withContext,
} from 'recompose'
import { SortableList } from 'pubsweet-components-faraday/src/components'

import FileSection from './FileSection'

import {
  uploadFile,
  deleteFile,
  getFiles,
  getRequestStatus,
  setAllFiles,
  moveFiles,
} from '../redux/files'

const Files = ({
  files,
  addFile,
  moveItem,
  removeFile,
  changeList,
  dropSortableFile,
  ...rest
}) => (
  <div>
    <FileSection
      addFile={addFile('manuscripts')}
      allowedFileExtensions={['pdf', 'doc', 'docx']}
      changeList={changeList}
      dropSortableFile={dropSortableFile}
      files={get(files, 'manuscripts') || []}
      isFirst
      listId="manuscripts"
      maxFiles={Number.POSITIVE_INFINITY}
      moveItem={moveItem('manuscripts')}
      removeFile={removeFile('manuscripts')}
      title="Main manuscript"
    />
    <FileSection
      addFile={addFile('supplementary')}
      changeList={changeList}
      dropSortableFile={dropSortableFile}
      files={get(files, 'supplementary') || []}
      listId="supplementary"
      maxFiles={Number.POSITIVE_INFINITY}
      moveItem={moveItem('supplementary')}
      removeFile={removeFile('supplementary')}
      title="Supplementarry files"
    />
    <FileSection
      addFile={addFile('coverLetter')}
      allowedFileExtensions={['pdf', 'doc', 'docx']}
      changeList={changeList}
      dropSortableFile={dropSortableFile}
      files={get(files, 'coverLetter') || []}
      isLast
      listId="coverLetter"
      maxFiles={1}
      moveItem={moveItem('coverLetter')}
      removeFile={removeFile('coverLetter')}
      title="Cover letter"
    />
  </div>
)

export default compose(
  withRouter,
  getContext({ version: PropTypes.object, project: PropTypes.object }),
  connect(
    state => ({
      isFetching: getRequestStatus(state),
      files: getFiles(state),
    }),
    {
      uploadFile,
      deleteFile,
      setAllFiles,
      moveFiles,
    },
  ),
  lifecycle({
    componentDidMount() {
      const { version, setAllFiles } = this.props
      setAllFiles(version.files)
    },
  }),
  withHandlers({
    dropSortableFile: ({ files, setAllFiles }) => () => {
      setAllFiles(files)
    },
    changeList: ({ files, setAllFiles }) => (fromListId, toListId, id) => {
      const swappedFile = files[fromListId].find(f => f.id === id)

      const fromFiles = files[fromListId].filter(f => f.id !== id)
      const toFiles = [...files[toListId], swappedFile]

      const newFiles = {
        ...files,
        [toListId]: toFiles,
        [fromListId]: fromFiles,
      }
      setAllFiles(newFiles)
    },
    addFile: ({ files, uploadFile, setAllFiles, version }) => type => file => {
      uploadFile(file, type, version.id).then(fileResponse => {
        const newFiles = {
          ...files,
          [type]: [...files[type], fileResponse],
        }
        setAllFiles(newFiles)
      })
    },
    moveItem: ({ moveFiles, files }) => type => (dragIndex, hoverIndex) => {
      const newFiles = {
        ...files,
        [type]: SortableList.moveItem(files[type], dragIndex, hoverIndex),
      }
      moveFiles(newFiles)
    },
    removeFile: ({
      setAllFiles,
      files,
      deleteFile,
      version,
    }) => type => id => e => {
      e.preventDefault()
      deleteFile(id, version.id)
      const newFiles = {
        ...files,
        [type]: files[type].filter(f => f.id !== id),
      }
      setAllFiles(newFiles, type)
    },
  }),
  withContext(
    {
      isFetching: PropTypes.object,
    },
    ({ isFetching }) => ({
      isFetching,
    }),
  ),
)(Files)
