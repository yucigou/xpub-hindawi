import React from 'react'
import { Icon, Button, th } from '@pubsweet/ui'
import styled, { css, withTheme } from 'styled-components'

const ConfirmationModal = ({
  title,
  subtitle,
  content,
  onConfirm,
  confirmText = 'OK',
  cancelText = 'Cancel',
  hideModal,
  theme,
  modalError,
}) => (
  <Root>
    <CloseIcon data-test="icon-modal-hide" onClick={hideModal}>
      <Icon color={theme.colorPrimary}>x</Icon>
    </CloseIcon>
    {title && <Title dangerouslySetInnerHTML={{ __html: title }} />}
    {subtitle && <Subtitle dangerouslySetInnerHTML={{ __html: subtitle }} />}
    {content && <Content dangerouslySetInnerHTML={{ __html: content }} />}

    {modalError && <ErrorMessage>{modalError}</ErrorMessage>}

    <ButtonsContainer>
      <Button data-test="button-modal-hide" onClick={hideModal}>
        {cancelText}
      </Button>
      {onConfirm && (
        <Button data-test="button-modal-confirm" onClick={onConfirm} primary>
          {confirmText}
        </Button>
      )}
    </ButtonsContainer>
  </Root>
)

export default withTheme(ConfirmationModal)

// #region styled-components
const defaultText = css`
  color: ${th('colorText')};
  font-family: ${th('fontReading')};
  font-size: ${th('fontSizeBaseSmall')};
`

const Root = styled.div`
  background-color: ${th('backgroundColor')};
  border: ${th('borderDefault')};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-height: calc(${th('gridUnit')} * 20);
  padding: calc(${th('gridUnit')} * 2);
  position: relative;
  overflow-y: scroll;
  width: calc(${th('gridUnit')} * 25);
`

const Title = styled.div`
  ${defaultText};
  font-size: ${th('fontSizeHeading5')};
  margin-bottom: ${th('gridUnit')};
  text-align: center;
`

const Subtitle = styled.div`
  ${defaultText};
  margin-bottom: calc(${th('subGridUnit')} * 6);
  text-align: center;
`

const Content = styled.div`
  ${defaultText};
  margin-top: calc(${th('subGridUnit')} * 2);
  text-align: left;
`
const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: ${th('gridUnit')} auto 0;
  width: 100%;
`
const CloseIcon = styled.div`
  cursor: pointer;
  position: absolute;
  top: ${th('subGridUnit')};
  right: ${th('subGridUnit')};
`

const ErrorMessage = styled.div`
  color: ${th('colorError')};
  margin: ${th('subGridUnit')};
  text-align: center;
`

// #endregion
