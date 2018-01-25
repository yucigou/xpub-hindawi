import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  compose,
  withHandlers,
  getContext,
  lifecycle,
  withState,
} from 'recompose'
import { change } from 'redux-form'
import { SortableList } from 'pubsweet-components-faraday/src/components'

import {
  addAuthor,
  getFragmentAuthors,
  setAuthors,
  moveAuthors,
} from '../../redux/authors'

import Author from './Author'
import StaticList from './StaticList'
import AuthorAdder from './AuthorAdder'
import AuthorEditor from './AuthorEditor'
import { DragHandle } from './FormItems'

const countries = [
  { label: 'Romania', value: 'ro' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Germany', value: 'de' },
  { label: 'France', value: 'fr' },
]

const Authors = ({
  authors,
  moveAuthor,
  addAuthor,
  editAuthor,
  match,
  version,
  dropItem,
  editMode,
  setEditMode,
  editedAuthor,
  ...rest
}) => (
  <div>
    <AuthorAdder
      addAuthor={addAuthor}
      authors={authors}
      editAuthor={editAuthor}
      editMode={editMode}
      match={match}
      setEditMode={setEditMode}
    />
    {editedAuthor > -1 ? (
      <StaticList
        authors={authors}
        editComponent={AuthorEditor}
        editIndex={editedAuthor}
        {...rest}
      />
    ) : (
      <SortableList
        dragHandle={DragHandle}
        dropItem={dropItem}
        editedAuthor={editedAuthor}
        items={authors}
        listItem={Author}
        moveItem={moveAuthor}
        {...rest}
      />
    )}
  </div>
)

export default compose(
  withRouter,
  getContext({ version: PropTypes.object, project: PropTypes.object }),
  connect(
    (state, { match: { params: { version } } }) => ({
      authors: getFragmentAuthors(state, version),
    }),
    {
      addAuthor,
      setAuthors,
      moveAuthors,
      formChange: change,
    },
  ),
  lifecycle({
    componentDidMount() {
      const { version, setAuthors } = this.props
      setAuthors(version.authors, version.id)
    },
  }),
  withState('editMode', 'setEditMode', false),
  withState('editedAuthor', 'setEditedAuthor', -1),
  withHandlers({
    setAuthorEdit: ({ setEditedAuthor, formChange }) => editedAuthor => e => {
      e && e.preventDefault && e.preventDefault()
      formChange('wizard', 'editMode', editedAuthor > -1)
      setEditedAuthor(prev => editedAuthor)
    },
    setEditMode: ({ setEditMode, formChange }) => mode => e => {
      e && e.preventDefault()
      formChange('wizard', 'editMode', mode)
      setEditMode(v => mode)
    },
    dropItem: ({ authors, project, version, setAuthors }) => () => {
      setAuthors(authors, version.id)
    },
    countryParser: () => countryCode =>
      countries.find(c => c.value === countryCode).label,
    parseAuthorType: () => (isSubmitting, isCorresponding, index) => {
      if (isSubmitting) return `#${index + 1} Submitting author`
      if (isCorresponding) return `#${index + 1} Corresponding author`
      return `#${index + 1} Author`
    },
    moveAuthor: ({
      authors,
      moveAuthors,
      project,
      version,
      match: { params },
    }) => (dragIndex, hoverIndex) => {
      const newAuthors = SortableList.moveItem(authors, dragIndex, hoverIndex)
      moveAuthors(newAuthors, params.version)
    },
    removeAuthor: ({
      authors,
      project,
      version,
      setAuthors,
    }) => authorEmail => () => {
      const newAuthors = authors.filter(a => a.email !== authorEmail)
      setAuthors(newAuthors, version.id)
    },
    setAsCorresponding: ({
      authors,
      setAuthors,
      version,
      project,
    }) => authorEmail => () => {
      const newAuthors = authors.map(a => ({
        ...a,
        isCorresponding: a.isSubmitting || a.email === authorEmail,
      }))
      setAuthors(newAuthors, version.id)
    },
  }),
)(Authors)
