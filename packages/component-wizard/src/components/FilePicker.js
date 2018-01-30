import React, { Component } from 'react'

class FilePicker extends Component {
  handleUpload = e => {
    const { onUpload } = this.props
    onUpload(e.target.files[0])
    this.fileInput.value = null
  }

  render() {
    const { children } = this.props
    return (
      <div>
        <input
          onChange={this.handleUpload}
          ref={input => (this.fileInput = input)}
          style={{ display: 'none' }}
          type="file"
        />
        {React.cloneElement(children, {
          onClick: e => {
            e.preventDefault()
            this.fileInput.click()
          },
        })}
      </div>
    )
  }
}

export default FilePicker
