import React from 'react'
import { Icon } from '@pubsweet/ui'
import styled, { withTheme } from 'styled-components'

const Pagination = ({
  page,
  itemsPerPage,
  incrementPage,
  decrementPage,
  hasMore,
  maxLength,
  theme,
}) => (
  <Root>
    <Showing>
      <span>Showing:</span>
      <span>{itemsPerPage}</span>
    </Showing>
    <Chevrons>
      <IconButton hide={page === 0} onClick={decrementPage}>
        <Icon color={theme.colorPrimary} size={18}>
          chevron-left
        </Icon>
      </IconButton>
      <span>
        {`${page * itemsPerPage + 1} to ${
          hasMore ? itemsPerPage * (page + 1) : maxLength
        }`}
      </span>
      <IconButton hide={!hasMore} onClick={incrementPage}>
        <Icon color={theme.colorPrimary} size={18}>
          chevron-right
        </Icon>
      </IconButton>
    </Chevrons>
  </Root>
)

export default withTheme(Pagination)

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
  font-family: ${({ theme }) => theme.fontInterface};
  font-size: ${({ theme }) => theme.fontSizeBaseSmall};
  text-align: left;
  color: ${({ theme }) => theme.colorPrimary};
  background-color: ${({ theme }) => theme.backgroundColor};
  opacity: ${({ hide }) => (hide ? 0 : 1)};

  &:active,
  &:focus {
    outline: none;
  }
  &:hover {
    opacity: 0.7;
  }
`

const Showing = styled.div`
  display: flex;
  align-items: center;

  span:first-child {
    font-family: ${({ theme }) => theme.fontInterface};
    font-size: ${({ theme }) => theme.fontSizeBaseSmall};
    text-align: left;
    color: ${({ theme }) => theme.colorPrimary};
    margin-right: 10px;
  }
  span:last-child {
    border: ${({ theme }) => theme.borderDefault};
    padding: 2px 10px;
  }
`
