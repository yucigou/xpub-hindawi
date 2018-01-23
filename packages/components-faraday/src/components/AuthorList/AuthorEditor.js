import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { Button } from '@pubsweet/ui'
import { reduxForm } from 'redux-form'
import { withRouter } from 'react-router-dom'
import { compose, getContext } from 'recompose'

import { ValidatedTextField, MenuItem } from './FormItems'
import { getFragmentAuthors, setAuthors } from '../../redux/authors'

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

const AuthorEdit = ({ setAuthorEdit, handleSubmit }) => (
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
      <Button onClick={handleSubmit} primary>
        Save
      </Button>
    </div>
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
      setAuthors,
    },
  ),
  reduxForm({
    form: 'edit',
    onSubmit: (
      values,
      dispatch,
      { setAuthorEdit, setAuthors, project, version, authors, index, ...rest },
    ) => {
      const newAuthors = [
        ...authors.slice(0, index),
        values.edit,
        ...authors.slice(index + 1),
      ]
      setAuthors(newAuthors, version.id)
      setTimeout(setAuthorEdit(-1), 100)
    },
  }),
)(AuthorEdit)
