import React from 'react'
import { get } from 'lodash'
import classnames from 'classnames'
import { reduxForm } from 'redux-form'
import { compose, withState, withHandlers } from 'recompose'
import { TextField, Menu, Icon, ValidatedField, Button } from '@pubsweet/ui'
import { required } from 'xpub-validators'

import classes from './AuthorList.local.scss'
import SortableList from './SortableList'

const countries = [
  { label: 'Romania', value: 'ro' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Germany', value: 'de' },
  { label: 'France', value: 'fr' },
]

const emailRegex = new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)

const emailValidator = value =>
  emailRegex.test(value) ? undefined : 'Invalid email'

const ValidatedTextField = ({ label, name, isRequired, validators = [] }) => {
  const v = [isRequired && required, ...validators].filter(Boolean)
  return (
    <div className={classnames(classes['validated-text'])}>
      <span className={classnames(classes.label)}>{label}</span>
      <ValidatedField component={TextField} name={name} validate={v} />
    </div>
  )
}

const MenuItem = ({ label, name, options }) => (
  <div className={classnames(classes['validated-text'])}>
    <span className={classnames(classes.label)}>{label}</span>
    <ValidatedField
      component={input => <Menu {...input} options={options} />}
      name={name}
      validate={[required]}
    />
  </div>
)
const AuthorAdder = ({
  author: { firstName, middleName, lastName, email, affiliation, country },
  editAuthor,
  addAuthor,
  handleSubmit,
  ...rest
}) => (
  <div className={classnames(classes.adder)}>
    <Button onClick={handleSubmit} primary>
      + Add author
    </Button>
    <span className={classnames(classes.title)}>Author</span>
    <div className={classnames(classes.row)}>
      <ValidatedTextField isRequired label="First name" name="firstName" />
      <ValidatedTextField label="Middle name" name="middleName" />
      <ValidatedTextField isRequired label="Last name" name="lastName" />
    </div>

    <div className={classnames(classes.row)}>
      <ValidatedTextField
        isRequired
        label="Email"
        name="email"
        validators={[emailValidator]}
      />
      <ValidatedTextField isRequired label="Affiliation" name="affiliation" />
      <MenuItem label="Country" name="country" options={countries} />
    </div>
  </div>
)

const Label = ({ label, value }) => (
  <div className={classnames(classes['label-container'])}>
    <span className={classnames(classes.label)}>{label}</span>
    <span className={classnames(classes.value)}>{value}</span>
  </div>
)

const DragHandle = () => (
  <div className={classnames(classes['drag-handle'])}>
    <Icon>chevron_up</Icon>
    <Icon size={16}>menu</Icon>
    <Icon>chevron_down</Icon>
  </div>
)

const Author = ({
  firstName,
  middleName,
  lastName,
  email,
  affiliation,
  country,
  isDragging,
  dragHandle,
  isOver,
  countryParser,
}) => (
  <div
    className={classnames({
      [classes.author]: true,
      [classes.dashed]: isOver,
    })}
  >
    {!isOver && dragHandle}
    <div
      className={classnames({
        [classes.container]: true,
        [classes.hide]: isOver,
      })}
    >
      <span className={classnames(classes.title)}>Author</span>
      <div className={classnames(classes.row)}>
        <Label label="First name" value={firstName} />
        <Label label="Middle name" value={middleName} />
        <Label label="Last name" value={lastName} />
      </div>
      <div className={classnames(classes.row)}>
        <Label label="Email" value={email} />
        <Label label="Affiliation" value={affiliation} />
        <Label label="Country" value={countryParser(country)} />
      </div>
    </div>
  </div>
)

const Adder = compose(
  reduxForm({
    form: 'new-author',
    onSubmit: (values, dispatch, { addAuthor, reset }) => {
      addAuthor(values)
      reset()
    },
  })(AuthorAdder),
)

const Authors = ({
  author,
  authors,
  moveAuthor,
  addAuthor,
  editAuthor,
  ...rest
}) => (
  <div>
    <Adder addAuthor={addAuthor} author={author} editAuthor={editAuthor} />
    <SortableList
      dragHandle={DragHandle}
      items={authors}
      listItem={Author}
      moveItem={moveAuthor}
      {...rest}
    />
  </div>
)

const initialAuthor = {
  firstName: '',
  middleName: '',
  lastName: '',
  email: '',
  affiliation: '',
  country: 'ro',
}
export default compose(
  withState('author', 'changeAuthor', initialAuthor),
  withState('authors', 'changeAuthors', []),
  withHandlers({
    countryParser: () => countryCode =>
      countries.find(c => c.value === countryCode).label,
    addAuthor: ({ changeAuthors, changeAuthor }) => author => {
      changeAuthors(prevAuthors => [author, ...prevAuthors])
      changeAuthor(prev => initialAuthor)
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
