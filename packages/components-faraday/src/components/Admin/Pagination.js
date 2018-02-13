import React from 'react'
import styled from 'styled-components'
import { Icon } from '@pubsweet/ui'

const Root = styled.div`
  display: flex;
  align-items: center;
`

const Chevrons = styled.div`
  display: flex;
  align-items: center;
`

const IconButton = styled.button`
  align-items: center;
  border: none;
  cursor: pointer;
  display: flex;
  font-family: Helvetica;
  font-size: 12px;
  text-align: left;
  color: #667080;

  &:active,
  &:focus {
    outline: none;
  }
`

const Showing = styled.div`
  display: flex;
  align-items: center;

  span:first-child {
    font-family: Helvetica;
    font-size: 14px;
    text-align: left;
    color: #667080;
    margin-right: 10px;
  }
  span:last-child {
    border: solid 1px #667080;
    padding: 2px 10px;
  }
`

const Pagination = ({ page, itemsPerPage, incrementPage, decrementPage }) => (
  <Root>
    <Showing>
      <span>Showing:</span>
      <span>50</span>
    </Showing>
    <Chevrons>
      <IconButton onClick={decrementPage}>
        <Icon color="#667080" size={18}>
          chevron-left
        </Icon>
      </IconButton>
      <span>{`${page * itemsPerPage + 1} to ${page * itemsPerPage + 50}`}</span>
      <IconButton onClick={incrementPage}>
        <Icon color="#667080" size={18}>
          chevron-right
        </Icon>
      </IconButton>
    </Chevrons>
  </Root>
)

export default Pagination
