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
import { change as changeForm } from 'redux-form'
import { SortableList } from 'pubsweet-components-faraday/src/components'

import { addAuthor } from '../../redux/authors'

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
  setFormAuthors,
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
      setFormAuthors={setFormAuthors}
    />
    {editedAuthor > -1 ? (
      <StaticList
        authors={authors}
        editComponent={AuthorEditor}
        editIndex={editedAuthor}
        setFormAuthors={setFormAuthors}
        {...rest}
      />
    ) : (
      <SortableList
        beginDragProps={['index', 'lastName']}
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
  connect(null, {
    addAuthor,
    changeForm,
  }),
  withState('authors', 'setAuthors', []),
  lifecycle({
    componentDidMount() {
      const { version, setAuthors } = this.props
      setAuthors(version.authors)
    },
  }),
  withState('editMode', 'setEditMode', false),
  withState('editedAuthor', 'setEditedAuthor', -1),
  withHandlers({
    setFormAuthors: ({ setAuthors, changeForm }) => authors => {
      setAuthors(authors)
      changeForm('wizard', 'authors', authors)
    },
  }),
  withHandlers({
    setAuthorEdit: ({ setEditedAuthor, changeForm }) => editedAuthor => e => {
      e && e.preventDefault && e.preventDefault()
      changeForm('wizard', 'editMode', editedAuthor > -1)
      setEditedAuthor(prev => editedAuthor)
    },
    setEditMode: ({ setEditMode, changeForm }) => mode => e => {
      e && e.preventDefault()
      changeForm('wizard', 'editMode', mode)
      setEditMode(v => mode)
    },
    dropItem: ({ authors, setFormAuthors }) => () => {
      setFormAuthors(authors)
    },
    countryParser: () => countryCode =>
      countries.find(c => c.value === countryCode).label,
    parseAuthorType: () => (isSubmitting, isCorresponding, index) => {
      if (isSubmitting) return `#${index + 1} Submitting author`
      if (isCorresponding) return `#${index + 1} Corresponding author`
      return `#${index + 1} Author`
    },
    moveAuthor: ({ authors, setAuthors, changeForm }) => (
      dragIndex,
      hoverIndex,
    ) => {
      const newAuthors = SortableList.moveItem(authors, dragIndex, hoverIndex)
      setAuthors(newAuthors)
    },
    removeAuthor: ({ authors, setFormAuthors }) => authorEmail => () => {
      const newAuthors = authors.filter(a => a.email !== authorEmail)
      setFormAuthors(newAuthors)
    },
    setAsCorresponding: ({ authors, setFormAuthors }) => authorEmail => () => {
      const newAuthors = authors.map(a => ({
        ...a,
        isCorresponding: a.isSubmitting || a.email === authorEmail,
      }))
      setFormAuthors(newAuthors)
    },
  }),
)(Authors)
