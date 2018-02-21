import React from 'react'
import { compose } from 'recompose'
import { Icon } from '@pubsweet/ui'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { reduxForm } from 'redux-form'

import countries from './countries'
import { Spinner } from '../UIComponents'
import { getAuthorFetching } from '../../redux/authors'
import { ValidatedTextField, MenuItem } from './FormItems'

const emailRegex = new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)

const emailValidator = value =>
  emailRegex.test(value) ? undefined : 'Invalid email'

const AuthorEdit = ({
  isFetching,
  setAuthorEdit,
  handleSubmit,
  parseAuthorType,
  index,
  isSubmitting,
  isCorresponding,
  setAsCorresponding,
  email,
}) => (
  <Root>
    <Header>
      <TitleContainer>
        <span>{parseAuthorType(isSubmitting, isCorresponding, index)}</span>
        <input
          checked={isCorresponding}
          onChange={setAsCorresponding(email)}
          type="checkbox"
        />
        <label>Corresponding</label>
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
      <ValidatedTextField isRequired label="First name" name="edit.firstName" />
      <ValidatedTextField label="Middle name" name="edit.middleName" />
      <ValidatedTextField isRequired label="Last name" name="edit.lastName" />
    </Row>

    <Row>
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
    </Row>
  </Root>
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

// #region styled-components
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
    font-family: Helvetica;
    font-size: 14px;
    font-weight: 600;
    margin-right: 20px;
    text-align: left;
  }

  label {
    font-family: Helvetica;
    font-size: 12px;
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
  border: 1px solid #444;
  margin: 10px 0;
  padding: 10px;
  display: flex;
  flex-direction: column;
`
// #endregion
