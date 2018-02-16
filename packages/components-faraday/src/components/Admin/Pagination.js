import React from 'react'
import { Icon } from '@pubsweet/ui'
import styled from 'styled-components'

const Pagination = ({
  page,
  itemsPerPage,
  incrementPage,
  decrementPage,
  hasMore,
  maxLength,
}) => (
  <Root>
    <Showing>
      <span>Showing:</span>
      <span>{itemsPerPage}</span>
    </Showing>
    <Chevrons>
      <IconButton hide={page === 0} onClick={decrementPage}>
        <Icon color="#667080" size={18}>
          chevron-left
        </Icon>
      </IconButton>
      <span>
        {`${page * itemsPerPage + 1} to ${
          hasMore ? itemsPerPage * (page + 1) : maxLength
        }`}
      </span>
      <IconButton hide={!hasMore} onClick={incrementPage}>
        <Icon color="#667080" size={18}>
          chevron-right
        </Icon>
      </IconButton>
    </Chevrons>
  </Root>
)

export default Pagination

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
  cursor: ${({ hide }) => (hide ? 'auto' : 'pointer')};
  display: flex;
  font-family: Helvetica;
  font-size: 12px;
  text-align: left;
  color: #667080;
  opacity: ${({ hide }) => (hide ? 0 : 1)};

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
