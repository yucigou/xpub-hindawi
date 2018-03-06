import React, { Fragment } from 'react'
import { pick } from 'lodash'
import { Icon, Checkbox } from '@pubsweet/ui'
import { connect } from 'react-redux'
import styled, { css } from 'styled-components'
import { compose, withHandlers, withProps } from 'recompose'
import { reduxForm, Field, change as changeForm } from 'redux-form'

import countries from './countries'
import { Spinner } from '../UIComponents'
import { getAuthorFetching } from '../../redux/authors'
import { ValidatedTextField, MenuItem } from './FormItems'

const emailRegex = new RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, //eslint-disable-line
)

const emailValidator = value =>
  emailRegex.test(value) ? undefined : 'Invalid email'

const renderCheckbox = ({ input }) => (
  <Checkbox checked={input.value} type="checkbox" {...input} />
)

const AuthorEdit = ({
  isFetching,
  setAuthorEdit,
  handleSubmit,
  parseAuthorType,
  index,
  isSubmitting,
  isCorresponding,
  email,
  changeCorresponding,
}) => (
  <Root>
    <Header>
      <TitleContainer>
        <span>{parseAuthorType(isSubmitting, isCorresponding, index)}</span>
        {!isSubmitting && (
          <Fragment>
            <Field
              component={renderCheckbox}
              name="edit.isCorresponding"
              onChange={changeCorresponding(email)}
            />
            <label>Corresponding</label>
          </Fragment>
        )}
      </TitleContainer>

      <ButtonsContainer>
        <ClickableIcon onClick={setAuthorEdit(-1)}>
          <Icon size={18}>x-circle</Icon>
        </ClickableIcon>
        {!isFetching ? (
          <ClickableIcon onClick={handleSubmit}>
            <Icon size={18}>check-circle</Icon>
          </ClickableIcon>
        ) : (
          <Spinner />
        )}
      </ButtonsContainer>
    </Header>

    <Row>
      <ValidatedTextField
        isRequired
        label="First name*"
        name="edit.firstName"
      />
      <ValidatedTextField label="Middle name" name="edit.middleName" />
      <ValidatedTextField isRequired label="Last name*" name="edit.lastName" />
    </Row>

    <Row>
      <ValidatedTextField
        isRequired
        label="Email*"
        name="edit.email"
        validators={[emailValidator]}
      />
      <ValidatedTextField
        isRequired
        label="Affiliation*"
        name="edit.affiliation"
      />
      <MenuItem label="Country*" name="edit.country" options={countries} />
    </Row>
  </Root>
)

export default compose(
  connect(
    state => ({
      isFetching: getAuthorFetching(state),
    }),
    { changeForm },
  ),
  withProps(props => ({
    initialValues: {
      edit: pick(props, [
        'isCorresponding',
        'isSubmitting',
        'firstName',
        'lastName',
        'middleName',
        'email',
        'affiliation',
        'country',
      ]),
    },
  })),
  withHandlers({
    changeCorresponding: ({ changeForm, setAsCorresponding }) => email => (
      evt,
      newValue,
    ) => {
      setAsCorresponding(email)()
      changeForm('edit', 'edit.isCorresponding', newValue)
    },
  }),
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

// #region styled-components
const defaultText = css`
  color: ${({ theme }) => theme.colorText};
  font-size: ${({ theme }) => theme.fontSizeBaseSmall};
  font-family: ${({ theme }) => theme.fontReading};
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px 0;
`

const TitleContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;

  > span {
    ${defaultText};
    font-size: ${({ theme }) => theme.fontSizeHeading6};
    margin-right: 10px;
    font-weight: 600;
    text-align: left;
  }

  label {
    ${defaultText};
    text-align: left;
  }
`

const ButtonsContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`

const ClickableIcon = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  margin: 0 12px;
`

const Header = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const Root = styled.div`
  border: ${({ theme }) => theme.borderDefault};
  margin: 10px 0;
  padding: 10px;
  display: flex;
  flex-direction: column;
`
// #endregion
