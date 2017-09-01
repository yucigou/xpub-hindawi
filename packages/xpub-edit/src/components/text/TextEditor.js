import React from 'react'
import { converter } from './config'
import Editor from '../Editor'
import classes from './TextEditor.local.scss'

// TODO: only allow a single line of text (no line-breaks)
// TODO: ensure that content is saved when component is unmounted or blurred

const TextEditor = ({ value, placeholder, title, onChange }) => (
  <Editor
    className={classes.root}
    value={value}
    converter={converter}
    placeholder={placeholder}
    title={title}
    onChange={onChange}
  />
)

export default TextEditor
