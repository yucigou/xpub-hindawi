import React from 'react'
import { Icon, Button } from '@pubsweet/ui'
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
}) => (
  <Root>
    <CloseIcon data-test="icon-modal-hide" onClick={hideModal}>
      <Icon color={theme.colorPrimary}>x</Icon>
    </CloseIcon>
    {title && <Title dangerouslySetInnerHTML={{ __html: title }} />}
    {subtitle && <Subtitle dangerouslySetInnerHTML={{ __html: subtitle }} />}
    {content && <Content dangerouslySetInnerHTML={{ __html: content }} />}
    <ButtonsContainer>
      <Button data-test="button-modal-hide" onClick={hideModal}>
        {cancelText}
      </Button>
      <Button data-test="button-modal-confirm" onClick={onConfirm} primary>
        {confirmText}
      </Button>
    </ButtonsContainer>
  </Root>
)

export default withTheme(ConfirmationModal)

// #region styled-components
const defaultText = css`
  color: ${({ theme }) => theme.colorText};
  font-family: ${({ theme }) => theme.fontReading};
  font-size: ${({ theme }) => theme.fontSizeBaseSmall};
`

const Root = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  padding: 50px 32px 32px 32px;
  border: ${({ theme }) => theme.borderDefault};
  position: relative;
  width: 600px;
  max-height: 500px;
  overflow-y: scroll;
`

const Title = styled.div`
  ${defaultText};
  font-size: ${({ theme }) => theme.fontSizeBase};
  text-align: center;
  margin-bottom: 20px;
`

const Subtitle = styled.div`
  ${defaultText};
  font-weight: bold;
  line-height: 1.57;
  margin-bottom: 15px;
  text-align: center;
`

const Content = styled.div`
  ${defaultText};
  line-height: 1.57;
  margin-top: 10px;
  text-align: left;
`
const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 30px auto 0;
`
const CloseIcon = styled.div`
  cursor: pointer;
  position: absolute;
  top: 5px;
  right: 5px;
`
// #endregion
