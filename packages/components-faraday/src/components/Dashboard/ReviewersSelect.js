import React from 'react'
import { get } from 'lodash'
import { th } from '@pubsweet/ui'
import { connect } from 'react-redux'
import styled, { css } from 'styled-components'
import { compose, withHandlers } from 'recompose'
import { Field, formValueSelector, getFormMeta } from 'redux-form'
// import { ValidatedTextField } from '../AuthorList/FormItems'

// const emailRegex = new RegExp(
//   /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, //eslint-disable-line
// )

// const emailValidator = value =>
//   emailRegex.test(value) ? undefined : 'Invalid email'

const defaultValues = [
  {
    email: 'cocosan@123.com',
    lastName: 'ln1',
    firstName: 'fn',
    affiliation: 'psd',
  },
  {
    email: 'cocosan@124.com',
    lastName: 'ln2',
    firstName: 'fn',
    affiliation: 'psd',
  },
  {
    email: 'cocosan@125.com',
    lastName: 'ln3',
    firstName: 'fn',
    affiliation: 'psd',
  },
  {
    email: 'cocosan@126.com',
    lastName: 'ln4',
    firstName: 'fn',
    affiliation: 'psd',
  },
  {
    email: 'cocosan@127.com',
    lastName: 'ln5',
    firstName: 'fn',
    affiliation: 'psd',
  },
  {
    email: 'cocosan@128.com',
    lastName: 'ln6',
    firstName: 'fn',
    affiliation: 'psd',
  },
  {
    email: 'cocosan@129.com',
    lastName: 'ln7',
    firstName: 'fn',
    affiliation: 'psd',
  },
]

const renderField = ({ input: { onBlur, ...rest } }) => (
  <RenderRoot>
    <Input
      {...rest}
      autoComplete="off"
      onBlur={() => {
        setTimeout(onBlur, 100)
      }}
      type="text"
    />
  </RenderRoot>
)

const ReviewersSelect = ({
  label = 'Email*',
  values = defaultValues,
  onSelect,
  reviewerEmail,
  formMeta,
}) => {
  const active = !!get(formMeta, 'email.active')
  const filteredValues = values.filter(v => v.email.includes(reviewerEmail))
  return (
    <Root>
      <FormLabel>{label}</FormLabel>
      <Field component={renderField} name="email" />
      {active &&
        filteredValues.length > 0 && (
          <SuggestionsContainer>
            <ScrollContainer>
              {filteredValues.map(v => (
                <SuggestionItem key={v.email} onClick={onSelect(v)}>
                  {`${v.firstName} ${v.lastName}`} - {v.email}
                </SuggestionItem>
              ))}
            </ScrollContainer>
          </SuggestionsContainer>
        )}
    </Root>
  )
}

const reviewerSelector = formValueSelector('inviteReviewer')

export default compose(
  connect(state => ({
    formMeta: getFormMeta('inviteReviewer')(state),
    reviewerEmail: reviewerSelector(state, 'email'),
  })),
  withHandlers({
    selectOption: {},
  }),
)(ReviewersSelect)

// #region styled-components
const defaultText = css`
  color: ${({ theme }) => theme.colorText};
  font-size: ${({ theme }) => theme.fontSizeBaseSmall};
  font-family: ${({ theme }) => theme.fontReading};
`

const Input = styled.input`
  border: 1px solid #667080;
  border-radius: 2px;
  font-family: inherit;
  font-size: inherit;
  padding: 0 calc(24px / 2);
  height: calc(24px * 2);
`

const RenderRoot = styled.div`
  display: flex;
  flex-direction: column;
  max-width: calc(${th('gridUnit')} * 14);
  margin-bottom: ${th('gridUnit')};
`

const SuggestionItem = styled.div`
  align-items: center;
  align-self: stretch;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  height: calc(${th('subGridUnit')} * 6);
  padding-left: calc(${th('subGridUnit')} * 2);

  &:hover {
    background-color: ${th('colorPrimary')};
  }
`

const ScrollContainer = styled.div`
  align-self: stretch;
  flex: 1;
  overflow: auto;
`

const SuggestionsContainer = styled.div`
  align-items: flex-start;
  background-color: ${th('backgroundColor')};
  border: ${th('borderDefault')};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: absolute;
  padding-top: calc(${th('subGridUnit')} * 2);
  top: 68px;
  width: 380px;
  max-height: calc(${th('subGridUnit')} * 6 * 4);
`

const FormLabel = styled.span`
  ${defaultText};
  font-weight: 300;
  height: 19px;
  text-transform: uppercase;
`

const Root = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 92px;
  margin-right: 5px;
  position: relative;
`
// #endregion
