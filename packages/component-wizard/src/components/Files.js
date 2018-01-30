import React from 'react'
import { get } from 'lodash'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actions } from 'pubsweet-client'
import { withRouter } from 'react-router-dom'
import { compose, withHandlers, getContext, lifecycle } from 'recompose'
import { SortableList } from 'pubsweet-components-faraday/src/components'

import FileSection from './FileSection'

import { uploadFile, setFiles, getFiles } from '../redux/files'

const Files = ({
  files,
  addFile,
  moveItem,
  removeFile,
  changeList,
  ...rest
}) => {
  console.log('Files', rest)
  return (
    <div>
      <FileSection
        addFile={addFile('manuscripts')}
        changeList={changeList}
        files={get(files, 'manuscripts') || []}
        isFirst
        listId="manuscripts"
        moveItem={moveItem('manuscripts')}
        removeFile={removeFile('manuscripts')}
        title="Main manuscript"
      />
      <FileSection
        addFile={addFile('supplementary')}
        changeList={changeList}
        files={get(files, 'supplementary') || []}
        listId="supplementary"
        moveItem={moveItem('supplementary')}
        removeFile={removeFile('supplementary')}
        title="Supplementarry files"
      />
      <FileSection
        addFile={addFile('coverLetter')}
        changeList={changeList}
        files={get(files, 'coverLetter') || []}
        isLast
        listId="coverLetter"
        moveItem={moveItem('coverLetter')}
        removeFile={removeFile('coverLetter')}
        title="Cover letter"
      />
    </div>
  )
}

export default compose(
  withRouter,
  getContext({ version: PropTypes.object, project: PropTypes.object }),
  connect(
    state => ({
      isFetching: state.files.isFetching,
      files: getFiles(state),
    }),
    { uploadFile, updateFragment: actions.updateFragment, setFiles },
  ),
  lifecycle({
    componentDidMount() {
      const { setFiles, version } = this.props
      setFiles(version.files.manuscripts, 'manuscripts')
      setFiles(version.files.supplementary, 'supplementary')
      setFiles(version.files.coverLetter, 'coverLetter')
    },
  }),
  withHandlers({
    changeList: ({ files, setFiles, updateFragment, project, version }) => (
      fromListId,
      toListId,
      id,
    ) => {
      const swappedFile = files[fromListId].find(f => f.id === id)

      const fromFiles = files[fromListId].filter(f => f.id !== id)
      const toFiles = [...files[toListId], swappedFile]

      setFiles(fromFiles, fromListId)
      setFiles(toFiles, toListId)

      updateFragment(project, {
        submitted: new Date(),
        ...version,
        files: {
          ...version.files,
          [fromListId]: fromFiles,
          [toListId]: toFiles,
        },
      })
    },
    addFile: ({
      files,
      setFiles,
      uploadFile,
      updateFragment,
      project,
      version,
    }) => type => file => {
      uploadFile(file).then(fileResponse => {
        setFiles([...files[type], fileResponse], type)
        updateFragment(project, {
          submitted: new Date(),
          ...version,
          files: {
            ...version.files,
            [type]: version.files[type]
              ? [...version.files[type], fileResponse]
              : [fileResponse],
          },
        })
      })
    },
    moveItem: ({ setFiles, files }) => type => (dragIndex, hoverIndex) => {
      setFiles(SortableList.moveItem(files[type], dragIndex, hoverIndex), type)
    },
    removeFile: () => type => name => e => {
      e.preventDefault()
      // changeFiles(prev => ({
      //   ...prev,
      //   [type]: prev[type].filter(f => f.name !== name),
      // }))
    },
  }),
)(Files)
