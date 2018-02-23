import React from 'react'
import { Icon } from '@pubsweet/ui'
import styled from 'styled-components'

const parseFileSize = size => {
  const kbSize = size / 1000
  const mbSize = kbSize / 1000
  const gbSize = mbSize / 1000

  if (Math.floor(gbSize)) {
    return `${Math.floor(gbSize)} GB`
  } else if (Math.floor(mbSize)) {
    return `${Math.floor(mbSize)} MB`
  } else if (Math.floor(kbSize)) {
    return `${Math.floor(kbSize)} kB`
  }
  return `${size} bytes`
}

const FileItem = ({
  dragHandle,
  name,
  size,
  id,
  removeFile,
  previewFile,
  ...rest
}) => (
  <Root>
    {dragHandle}
    <Info>
      <span>{name}</span>
      <span>{parseFileSize(size)}</span>
    </Info>
    <Buttons>
      <button onClick={previewFile(id)}>
        <Icon color="#666">eye</Icon>
      </button>
      <button onClick={removeFile(id)} title="Delete">
        <Icon color="#666">trash-2</Icon>
      </button>
    </Buttons>
  </Root>
)

export default FileItem

// #region styles
const Root = styled.div`
  align-items: center;
  border: ${({ theme }) => theme.borderDefault};
  display: flex;
  margin: 5px;
`

const Info = styled.div`
  border-right: ${({ theme }) => theme.borderDefault};
  display: flex;
  flex: 1;
  justify-content: space-between;
  padding: 2px 10px 2px 0;
`

const Buttons = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0 10px;

  a {
    align-items: center;
    display: flex;
  }

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;

    &:active,
    &:focus {
      outline: none;
    }
  }
`
// #endregion
