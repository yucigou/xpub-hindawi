import React from 'react'
import classnames from 'classnames'
import { compose } from 'recompose'
import { Button } from '@pubsweet/ui'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import { Spinner } from '../UIComponents'
import { getAuthorFetching } from '../../redux/authors'
import { ValidatedTextField, MenuItem } from './FormItems'

import classes from './AuthorList.local.scss'

const countries = [
  { label: 'Romania', value: 'ro' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Germany', value: 'de' },
  { label: 'France', value: 'fr' },
]

const emailRegex = new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)

const emailValidator = value =>
  emailRegex.test(value) ? undefined : 'Invalid email'

const AuthorEdit = ({ isFetching, setAuthorEdit, handleSubmit }) => (
  <div className={classnames(classes['editor-body'])}>
    <div className={classnames(classes.row)}>
      <ValidatedTextField isRequired label="First name" name="edit.firstName" />
      <ValidatedTextField label="Middle name" name="edit.middleName" />
      <ValidatedTextField isRequired label="Last name" name="edit.lastName" />
    </div>

    <div className={classnames(classes.row)}>
      <ValidatedTextField
        isRequired
        label="Email"
        name="edit.email"
        validators={[emailValidator]}
      />
      <ValidatedTextField
        isRequired
        label="Affiliation"
        name="edit.affiliation"
      />
      <MenuItem label="Country" name="edit.country" options={countries} />
    </div>

    <div className={classnames(classes['form-buttons'])}>
      <Button onClick={setAuthorEdit(-1)}>Cancel</Button>
      {!isFetching ? (
        <Button onClick={handleSubmit} primary>
          Save
        </Button>
      ) : (
        <Spinner />
      )}
    </div>
  </div>
)

export default compose(
  connect(state => ({
    isFetching: getAuthorFetching(state),
  })),
  reduxForm({
    form: 'edit',
    onSubmit: (
      values,
      dispatch,
      { setAuthorEdit, setAuthors, authors, index, changeForm },
    ) => {
      const newAuthors = [
        ...authors.slice(0, index),
        values.edit,
        ...authors.slice(index + 1),
      ]
      setAuthorEdit(-1)()
      setAuthors(newAuthors)
    },
  }),
)(AuthorEdit)
