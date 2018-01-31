import React, { Component } from 'react'

class FilePicker extends Component {
  handleUpload = e => {
    const { onUpload } = this.props

    onUpload(e.target.files[0])
    this.fileInput.value = null
  }

  getAllowedTypes = () => {
    const { allowedFileExtensions } = this.props

    if (!allowedFileExtensions) {
      return []
    }

    return allowedFileExtensions.map(ext => `.${ext}`)
  }

  render() {
    const { children, disabled } = this.props
    return (
      <div>
        <input
          accept={this.getAllowedTypes()}
          onChange={this.handleUpload}
          ref={input => (this.fileInput = input)}
          style={{ display: 'none' }}
          type="file"
        />
        {React.cloneElement(children, {
          onClick: e => {
            e.preventDefault()
            !disabled && this.fileInput.click()
          },
        })}
      </div>
    )
  }
}

export default FilePicker
