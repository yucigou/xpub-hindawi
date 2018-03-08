import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { compose, withHandlers, withState } from 'recompose'

import { Spinner } from '../UIComponents/index'

const createAnchorElement = (file, filename) => {
  const url = URL.createObjectURL(file)
  const a = document.createElement('a')

  a.href = url
  a.download = filename
  document.body.appendChild(a)

  return {
    a,
    url,
  }
}

const removeAnchorElement = (a, url) => {
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

const ZipFiles = ({
  disabled,
  fragmentId,
  fetching,
  children,
  downloadFiles,
}) => (
  <Root onClick={!disabled ? downloadFiles : null}>
    {fetching ? <Spinner /> : children}
  </Root>
)

const cache = {}

const Zip = compose(
  connect(state => ({
    token: state.currentUser.user.token,
  })),
  withState('fetching', 'setFetching', false),
  withHandlers({
    downloadFiles: ({ fragmentId, token, setFetching, archiveName }) => () => {
      if (cache[fragmentId]) {
        const fileName = archiveName || `${fragmentId}-archive.zip`

        const { a, url } = createAnchorElement(cache[fragmentId], fileName)
        a.click()
        removeAnchorElement(a, url)
      } else {
        setFetching(fetching => true)
        const xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function onXhrStateChange() {
          if (this.readyState === 4) {
            setFetching(fetching => false)
            if (this.status >= 200 && this.status < 300) {
              const fileName = archiveName || `${fragmentId}-archive.zip`
              const f = new File([this.response], fileName, {
                type: 'application/zip',
              })
              cache[fragmentId] = f

              const { a, url } = createAnchorElement(f, fileName)
              a.click()
              removeAnchorElement(a, url)
            }
          }
        }
        xhr.open('GET', `${window.location.origin}/api/fileZip/${fragmentId}`)
        xhr.responseType = 'blob'
        xhr.setRequestHeader('Authorization', `Bearer ${token}`)
        xhr.send()
      }
    },
  }),
)(ZipFiles)

Zip.propTypes = {
  disabled: PropTypes.bool,
  archiveName: PropTypes.string,
  fragmentId: PropTypes.string.isRequired,
}

Zip.defaultProps = {
  disabled: false,
}

export default Zip

// #region styled components
const Root = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  margin: 0 7px;
  width: 38px;
`
// #endregion
