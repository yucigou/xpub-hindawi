import React from 'react'
import { get } from 'lodash'
import { Icon } from '@pubsweet/ui'
import styled, { css, withTheme } from 'styled-components'

const AbstractModal = ({ metadata, hideModal, theme }) => (
  <Root>
    <CloseIcon onClick={hideModal}>
      <Icon color={theme.colorPrimary}>x</Icon>
    </CloseIcon>
    <Title dangerouslySetInnerHTML={{ __html: get(metadata, 'title') }} />
    <Subtitle>Abstract</Subtitle>
    <Content dangerouslySetInnerHTML={{ __html: get(metadata, 'abstract') }} />
  </Root>
)

export default withTheme(AbstractModal)

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
  text-align: left;
`

const Subtitle = styled.div`
  ${defaultText};
  font-weight: bold;
  line-height: 1.57;
  margin-bottom: 8px;
  text-align: left;
`

const Content = styled.div`
  ${defaultText};
  line-height: 1.57;
  margin-top: 10px;
  text-align: left;
`

const CloseIcon = styled.div`
  cursor: pointer;
  position: absolute;
  top: 5px;
  right: 5px;
`
// #endregion
