import React from 'react'
import { Icon } from '@pubsweet/ui'
import styled from 'styled-components'

import { Label } from './FormItems'

export default ({
  firstName,
  middleName,
  lastName,
  email,
  affiliation,
  country,
  dragHandle,
  isOver,
  countryParser,
  removeAuthor,
  isSubmitting,
  isCorresponding,
  parseAuthorType,
  editedAuthor,
  setAuthorEdit,
  index,
}) => (
  <Root isOver={isOver}>
    {!isOver && dragHandle}
    <AuthorContainer isOver={isOver}>
      <Header>
        <Title>{parseAuthorType(isSubmitting, isCorresponding, index)}</Title>
        <ButtonContainer>
          {!isSubmitting && (
            <ClickableIcon onClick={removeAuthor(email)} title="Delete author">
              <Icon size={18}>trash</Icon>
            </ClickableIcon>
          )}
          {editedAuthor < 0 && (
            <ClickableIcon onClick={setAuthorEdit(index)} title="Edit author">
              <Icon size={18}>edit-2</Icon>
            </ClickableIcon>
          )}
        </ButtonContainer>
      </Header>
      <Row>
        <Label label="First name" value={firstName} />
        <Label label="Middle name" value={middleName} />
        <Label label="Last name" value={lastName} />
      </Row>
      <Row>
        <Label label="Email" value={email} />
        <Label label="Affiliation" value={affiliation} />
        <Label label="Country" value={countryParser(country)} />
      </Row>
    </AuthorContainer>
  </Root>
)

// #region styled-components
const Header = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const Title = styled.span`
  font-family: Helvetica;
  font-size: 14px;
  font-weight: 600;
`

const ButtonContainer = styled.div`
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

const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px 0;
`

const AuthorContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 10px;
  opacity: ${({ isOver }) => (isOver ? 0 : 1)};
`

const Root = styled.div`
  border: 1px solid #444;
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  border: ${({ isOver }) =>
    isOver ? '1px dashed #444 !important' : '1px solid #444'};
`
// #endregion
