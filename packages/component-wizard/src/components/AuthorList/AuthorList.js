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

import {
  addAuthor,
  getFragmentAuthors,
  setAuthors,
  moveAuthors,
} from '../../redux/authors'

import SortableList from '../SortableList'

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
    setAuthorEdit: ({ setEditedAuthor }) => editedAuthor => e => {
      e && e.preventDefault && e.preventDefault()
      setEditedAuthor(prev => editedAuthor)
    },
    setEditMode: ({ setEditMode }) => mode => e => {
      e && e.preventDefault()
      setEditMode(v => mode)
    },
    dropItem: ({ authors, project, version, setAuthors }) => () => {
      setAuthors(authors, version.id)
    },
    countryParser: () => countryCode =>
      countries.find(c => c.value === countryCode).label,
    parseAuthorType: () => (isSubmitting, isCorresponding) => {
      if (isSubmitting) return 'Submitting author'
      if (isCorresponding) return 'Corresponding author'
      return 'Author'
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
