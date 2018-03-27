import React from 'react'
import { Button, th } from '@pubsweet/ui'
import styled, { css, withTheme } from 'styled-components'

const SuccessModal = ({ title, confirmText = 'OK', hideModal, theme }) => (
  <Root>
    {title && <Title dangerouslySetInnerHTML={{ __html: title }} />}
    <ButtonsContainer>
      <Button data-test="button-modal-confirm" onClick={hideModal} primary>
        {confirmText}
      </Button>
    </ButtonsContainer>
  </Root>
)

export default withTheme(SuccessModal)

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

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: ${th('gridUnit')} auto 0;
  width: 100%;
`
// #endregion
