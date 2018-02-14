import React from 'react'

const Logo = ({ srcUrl, onClick }) => (
  <div onClick={onClick}>
    <img alt="Hindawi" height="36" src={srcUrl} title="Hindawi" />
  </div>
)

export default Logo
