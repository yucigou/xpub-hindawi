import React from 'react'
import { get } from 'lodash'
import classnames from 'classnames'
import { TextField, Menu } from '@pubsweet/ui'
import { compose, withState, withHandlers } from 'recompose'

import classes from './AuthorList.local.scss'
import SortableList from './SortableList'

const countries = [
  { label: 'Romania', value: 'ro' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Germany', value: 'de' },
  { label: 'France', value: 'fr' },
]

const AuthorAdder = ({
  author: { firstName, middleName, lastName, email, affiliation, country },
  editAuthor,
  addAuthor,
}) => (
  <div className={classnames(classes.adder)}>
    <button onClick={addAuthor}>Add author</button>
    <span className={classnames(classes.title)}>Author</span>
    <div className={classnames(classes.row)}>
      <TextField
        label="First name"
        onChange={editAuthor('firstName')}
        value={firstName}
      />
      <TextField
        label="Midle name"
        onChange={editAuthor('middleName')}
        value={middleName}
      />
      <TextField
        label="Last name"
        onChange={editAuthor('lastName')}
        value={lastName}
      />
    </div>
    <div className={classnames(classes.row)}>
      <TextField
        label="Email"
        onChange={editAuthor('email')}
        type="email"
        value={email}
      />
      <TextField
        label="Affiliation"
        onChange={editAuthor('affiliation')}
        value={affiliation}
      />
      <Menu
        onChange={editAuthor('country')}
        options={countries}
        value={country}
      />
    </div>
  </div>
)

const Label = ({ label, value }) => (
  <div className={classnames(classes['label-container'])}>
    <span className={classnames(classes.label)}>{label}</span>
    <span className={classnames(classes.value)}>{value}</span>
  </div>
)

const Author = ({
  firstName,
  middleName,
  lastName,
  email,
  affiliation,
  isDragging,
  children,
}) => (
  <div className={classnames(classes.author)}>
    <span className={classnames(classes.title)}>Author</span>
    {!isDragging && (
      <div className={classnames(classes.row)}>
        <Label label="First name" value={firstName} />
        <Label label="Middle name" value={middleName} />
        <Label label="Last name" value={lastName} />
      </div>
    )}
    {!isDragging && (
      <div className={classnames(classes.row)}>
        <Label label="Email" value={email} />
        <Label label="Affiliation" value={affiliation} />
        <Label label="Affiliation" value={affiliation} />
      </div>
    )}
  </div>
)

const Authors = ({ author, authors, moveAuthor, addAuthor, editAuthor }) => (
  <div>
    <AuthorAdder
      addAuthor={addAuthor}
      author={author}
      editAuthor={editAuthor}
    />
    <SortableList items={authors} listItem={Author} moveItem={moveAuthor} />
  </div>
)

export default compose(
  withState('author', 'changeAuthor', {
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    affiliation: '',
    country: 'ro',
  }),
  withState('authors', 'changeAuthors', [
    {
      firstName: 'Razvan',
      middleName: 'Petru',
      lastName: 'Tudosa',
      email: 'rzv@gmail.com',
      affiliation: 'rock',
    },
    {
      firstName: 'Alexandru',
      middleName: 'Ioan',
      lastName: 'Munteanu',
      email: 'alexmntn@gmail.com',
      affiliation: 'rap',
    },
    {
      firstName: 'Bogdan',
      middleName: 'Alexandru',
      lastName: 'Cochior',
      email: 'bog1@gmail.com',
      affiliation: 'metal',
    },
  ]),
  withHandlers({
    addAuthor: ({ author, changeAuthors, changeAuthor }) => e => {
      e.preventDefault()
      changeAuthors(prevAuthors => [author, ...prevAuthors])
      changeAuthor(prev => ({
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        affiliation: '',
        country: 'ro',
      }))
    },
    moveAuthor: ({ changeAuthors }) => (dragIndex, hoverIndex) => {
      changeAuthors(prev => SortableList.moveItem(prev, dragIndex, hoverIndex))
    },
    editAuthor: ({ changeAuthor }) => field => e => {
      const v = get(e, 'target.value') || e
      changeAuthor(prev => ({
        ...prev,
        [field]: v,
      }))
    },
  }),
)(Authors)
