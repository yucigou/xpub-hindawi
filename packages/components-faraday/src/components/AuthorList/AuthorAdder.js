import React from 'react'
import { get } from 'lodash'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { Button } from '@pubsweet/ui'
import { reduxForm } from 'redux-form'
import { compose, withProps } from 'recompose'
import { selectCurrentUser } from 'xpub-selectors'

import classes from './AuthorList.local.scss'
import { MenuItem, ValidatedTextField } from './FormItems'

const countries = [
  { label: 'Romania', value: 'ro' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Germany', value: 'de' },
  { label: 'France', value: 'fr' },
]

const emailRegex = new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)

const emailValidator = value =>
  emailRegex.test(value) ? undefined : 'Invalid email'

const AuthorAdder = ({ authors, editMode, setEditMode, handleSubmit }) => (
  <div className={classnames(classes.adder)}>
    <Button onClick={setEditMode(true)} primary>
      {authors.length === 0 ? '+ Add submitting author' : '+ Add author'}
    </Button>
    {editMode && (
      <div className={classnames(classes['form-body'])}>
        <span className={classnames(classes.title)}>
          {authors.length === 0 ? 'Submitting author' : 'Author'}
        </span>
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
          <ValidatedTextField
            isRequired
            label="Affiliation"
            name="affiliation"
          />
          <MenuItem label="Country" name="country" options={countries} />
        </div>
        <div className={classnames(classes['form-buttons'])}>
          <Button onClick={setEditMode(false)}>Cancel</Button>
          <Button onClick={handleSubmit} primary>
            Save
          </Button>
        </div>
      </div>
    )}
  </div>
)

export default compose(
  connect(state => ({
    currentUser: selectCurrentUser(state),
  })),
  withProps(({ currentUser: { admin, username, email }, authors }) => {
    if (!admin && authors.length === 0) {
      return {
        initialValues: {
          email,
          firstName: username,
        },
      }
    }
  }),
  reduxForm({
    form: 'author',
    enableReinitialize: true,
    onSubmit: (
      values,
      dispatch,
      { authors, addAuthor, setEditMode, setFormAuthors, reset, match },
    ) => {
      const collectionId = get(match, 'params.project')
      const fragmentId = get(match, 'params.version')
      const isFirstAuthor = authors.length === 0
      addAuthor(
        {
          ...values,
          isSubmitting: isFirstAuthor,
          isCorresponding: isFirstAuthor,
        },
        collectionId,
        fragmentId,
      ).then(author => {
        const newAuthors = [...authors, author]
        setFormAuthors(newAuthors)
        reset()
        setEditMode(false)()
      })
    },
  }),
)(AuthorAdder)
