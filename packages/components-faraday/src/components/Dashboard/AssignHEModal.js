/* eslint react/prefer-stateless-function: 0 */

import React from 'react'
import { th } from '@pubsweet/ui'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { handlingEditors, assignHandlingEditor } from '../../redux/editors'

class AssignHEModal extends React.Component {
  state = {
    searchInput: '',
  }

  changeInput = e => {
    this.setState({ searchInput: e.target.value })
  }

  filterEditors = editors => {
    const { searchInput } = this.state
    return editors.filter(({ firstName, lastName, email }) =>
      `${firstName} ${lastName} ${email}`
        .toLowerCase()
        .includes(searchInput.trim()),
    )
  }

  assignEditor = email => () => {
    const { assignHandlingEditor, collectionId, hideModal } = this.props
    assignHandlingEditor(email, collectionId).then(hideModal)
  }

  render() {
    const { searchInput } = this.state
    const { editors } = this.props
    const filteredEditors = this.filterEditors(editors)
    return (
      <RootModal>
        <ModalTitle>Assign Handling Editor</ModalTitle>
        <ModalHeader>
          <span>HANDLING EDITORS</span>
          <SearchInput
            onChange={this.changeInput}
            type="text"
            value={searchInput}
          />
        </ModalHeader>
        <ScrollContainer>
          <ModalContent>
            {filteredEditors.map(({ firstName, lastName, email }, index) => (
              <SuggestedEditor
                isLast={index === filteredEditors.length - 1}
                key={email}
              >
                <EditorDetails>
                  <span>{`${firstName} ${lastName}`}</span>
                  <span>{email}</span>
                </EditorDetails>
                <AssignButton onClick={this.assignEditor(email)}>
                  ASSIGN
                </AssignButton>
              </SuggestedEditor>
            ))}
          </ModalContent>
        </ScrollContainer>
      </RootModal>
    )
  }
}

export default compose(
  connect(
    state => ({
      editors: handlingEditors(state),
    }),
    { assignHandlingEditor },
  ),
)(AssignHEModal)

// #region styled-components
const EditorDetails = styled.div`
  display: flex;
  flex-direction: column;
`
const SuggestedEditor = styled.div`
  align-items: center;
  border: ${th('borderDefault')};
  border-bottom: ${({ isLast }) => (isLast ? th('borderDefault') : 'none')};
  display: flex;
  justify-content: space-between;
  padding: ${th('subGridUnit')};
  height: calc(${th('gridUnit')} * 2);

  &:hover {
    background-color: ${th('colorSecondary')};
  }
`

const AssignButton = styled.button`
  align-items: center;
  color: ${th('colorTextReverse')};
  background-color: ${th('colorPrimary')};
  display: flex;
  justify-content: center;
  height: ${th('gridUnit')};
  width: calc(${th('gridUnit')} * 4);
  opacity: 0;

  ${SuggestedEditor}:hover & {
    opacity: 1;
  }
`

const RootModal = styled.div`
  align-items: center;
  background-color: ${th('colorBackgroundHue')};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: calc(${th('gridUnit')} * 18);
  padding: calc(${th('subGridUnit')} * 8) calc(${th('subGridUnit')} * 6);
  width: calc(${th('gridUnit')} * 24);
`

const ModalTitle = styled.span`
  color: ${th('colorPrimary')};
  font-size: ${th('fontSizeHeading4')};
  font-family: ${th('fontHeading')};
  margin-bottom: calc(${th('subGridUnit')} * 5);
`

const ModalHeader = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;

  & span {
    color: ${th('colorPrimary')};
    font-size: ${th('fontSizeBase')};
    margin-bottom: ${th('subGridUnit')};
  }
`

const SearchInput = styled.input`
  border: 4px solid gray;
  height: calc(${th('subGridUnit')} * 5);
  padding: ${th('subGridUnit')};
`

const ScrollContainer = styled.div`
  align-self: stretch;
  flex: 1;
  overflow: auto;
  border: ${th('borderDefault')};
`

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  padding: calc(${th('subGridUnit')} * 2) calc(${th('subGridUnit')} * 3);
`
// #endregion
