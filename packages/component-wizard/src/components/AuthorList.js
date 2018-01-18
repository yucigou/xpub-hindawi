import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { get, debounce } from 'lodash'
import { reduxForm } from 'redux-form'
import { required } from 'xpub-validators'
import { withRouter } from 'react-router-dom'
import { compose, withHandlers, getContext } from 'recompose'
import { TextField, Menu, Icon, ValidatedField, Button } from '@pubsweet/ui'
import { actions } from 'pubsweet-client'

import { addAuthor, getFragmentAuthors, setAuthors } from '../redux/authors'

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
const AuthorAdder = ({ addAuthor, handleSubmit, ...rest }) => (
  <div className={classnames(classes.adder)}>
    <Button onClick={handleSubmit} primary>
      + Add author
    </Button>
    <span className={classnames(classes.title)}>Author</span>
    <div className={classnames(classes.row)}>
      <ValidatedTextField
        isRequired
        label="First name"
        name="author.firstName"
      />
      <ValidatedTextField label="Middle name" name="author.middleName" />
      <ValidatedTextField isRequired label="Last name" name="author.lastName" />
    </div>

    <div className={classnames(classes.row)}>
      <ValidatedTextField
        isRequired
        label="Email"
        name="author.email"
        validators={[emailValidator]}
      />
      <ValidatedTextField
        isRequired
        label="Affiliation"
        name="author.affiliation"
      />
      <MenuItem label="Country" name="author.country" options={countries} />
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
    form: 'author',
    destroyOnUnmount: false,
    onSubmit: (values, dispatch, { addAuthor, reset, match }) => {
      const collectionId = get(match, 'params.project')
      const fragmentId = get(match, 'params.version')
      addAuthor(values.author, collectionId, fragmentId).then(reset)
    },
  })(AuthorAdder),
)

const Authors = ({
  author,
  authors,
  moveAuthor,
  addAuthor,
  editAuthor,
  match,
  version,
  dropItem,
  ...rest
}) => (
  <div>
    <Adder
      addAuthor={addAuthor}
      author={author}
      editAuthor={editAuthor}
      match={match}
    />
    <SortableList
      dragHandle={DragHandle}
      dropItem={dropItem}
      items={authors}
      listItem={Author}
      moveItem={moveAuthor}
      {...rest}
    />
  </div>
)

export default compose(
  withRouter,
  connect(
    (state, { match: { params: { version } } }) => ({
      authors: getFragmentAuthors(state, version),
    }),
    { addAuthor, setAuthors, updateFragment: actions.updateFragment },
  ),
  getContext({ version: PropTypes.object, project: PropTypes.object }),
  withHandlers({
    dropItem: ({ updateFragment, authors, project, version }) =>
      debounce(() => {
        updateFragment(project, {
          ...version,
          authors,
        })
      }, 500),
    countryParser: () => countryCode =>
      countries.find(c => c.value === countryCode).label,
    moveAuthor: ({
      authors,
      setAuthors,
      project,
      version,
      updateFragment,
      match: { params },
    }) => (dragIndex, hoverIndex) => {
      const newAuthors = SortableList.moveItem(authors, dragIndex, hoverIndex)
      setAuthors(newAuthors, params.version)
    },
  }),
)(Authors)
