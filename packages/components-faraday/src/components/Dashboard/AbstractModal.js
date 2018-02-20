import React from 'react'
import { get } from 'lodash'
import { Icon } from '@pubsweet/ui'
import styled from 'styled-components'

const AbstractModal = ({ metadata, hideModal }) => (
  <Root>
    <CloseIcon onClick={hideModal}>
      <Icon color="#667080">x</Icon>
    </CloseIcon>
    <Title dangerouslySetInnerHTML={{ __html: get(metadata, 'title') }} />
    <Subtitle>Abstract</Subtitle>
    <Content dangerouslySetInnerHTML={{ __html: get(metadata, 'abstract') }} />
  </Root>
)

export default AbstractModal

// #region styled-components
const Root = styled.div`
  background-color: #fff;
  padding: 50px 32px 32px 32px;
  border: 1px solid #667080;
  position: relative;
  width: 600px;
  max-height: 500px;
`

const Title = styled.div`
  font-family: Helvetica;
  font-size: 18px;
  text-align: left;
  color: #667080;
`

const Subtitle = styled.div`
  color: #667080;
  font-family: Helvetica;
  font-size: 14px;
  font-weight: bold;
  line-height: 1.57;
  margin-bottom: 8px;
  text-align: left;
`

const Content = styled.div`
  color: #667080;
  font-family: Helvetica;
  font-size: 14px;
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
