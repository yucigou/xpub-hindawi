import React from 'react'
import { compose, withState, withHandlers } from 'recompose'
import { SortableList } from 'pubsweet-components-faraday/src/components'

import FileSection from './FileSection'

const Files = ({ files, addFile, moveItem, removeFile, changeList }) => (
  <div>
    <FileSection
      addFile={addFile('main')}
      changeList={changeList}
      files={files.main}
      isFirst
      listId="main"
      moveItem={moveItem('main')}
      removeFile={removeFile('main')}
      title="Main manuscript"
    />
    <FileSection
      addFile={addFile('supplemental')}
      changeList={changeList}
      files={files.supplemental}
      listId="supplemental"
      moveItem={moveItem('supplemental')}
      removeFile={removeFile('supplemental')}
      title="Supplemental files"
    />
    <FileSection
      addFile={addFile('letter')}
      changeList={changeList}
      files={files.letter}
      isLast
      listId="letter"
      moveItem={moveItem('letter')}
      removeFile={removeFile('letter')}
      title="Cover letter"
    />
  </div>
)

export default compose(
  withState('files', 'changeFiles', { main: [], supplemental: [], letter: [] }),
  withHandlers({
    changeList: ({ files, changeFiles }) => (fromListId, toListId, name) => {
      const changedFile = files[fromListId].find(f => f.name === name)
      changeFiles(prev => ({
        ...prev,
        [fromListId]: prev[fromListId].filter(f => f.name !== name),
        [toListId]: [...prev[toListId], changedFile],
      }))
    },
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
