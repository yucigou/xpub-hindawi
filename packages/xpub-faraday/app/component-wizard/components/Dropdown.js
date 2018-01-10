import React from 'react'
import { compose, withState, withHandlers } from 'recompose'
import classnames from 'classnames'

import classes from './Dropdown.local.scss'

const DropdownOptions = ({ visible, options, onSelect }) =>
  visible ? (
    <div className={classes.options}>
      {options.map(opt => (
        <div key={opt.value} onClick={onSelect(opt)}>
          {opt.label}
        </div>
      ))}
    </div>
  ) : null

const Dropdown = ({
  label,
  showDropdown,
  inputValue,
  changeInput,
  defaultValue = null,
  options,
  onChange,
  setDropdown,
  selectValue,
}) => (
  <div className={classes.container}>
    <span className={classes.label}>{label}</span>
    <div className={classes.inputContainer}>
      <input
        onChange={changeInput}
        onFocus={setDropdown(true)}
        placeholder="Type or select from dropdown"
        type="text"
        value={inputValue.label}
      />
      <span className={classnames({ [classes.downarrow]: showDropdown })}>
        &#9658;
      </span>
    </div>
    <DropdownOptions
      onSelect={selectValue}
      options={options.filter(opt => opt.label.indexOf(inputValue.label) > -1)}
      visible={showDropdown}
    />
  </div>
)

export default compose(
  withState('inputValue', 'setInputValue', ({ defaultValue }) => defaultValue),
  withState('showDropdown', 'setDropdownVisibility', false),
  withHandlers({
    changeInput: ({ setInputValue }) => e => {
      e.persist()
      setInputValue(prev => ({ ...prev, label: e.target.value }))
    },
    setDropdown: ({ setDropdownVisibility }) => visibilty => e => {
      setDropdownVisibility(visibilty)
    },
    selectValue: ({ setInputValue, setDropdownVisibility }) => value => e => {
      setInputValue(value)
      setDropdownVisibility(false)
    },
  }),
)(Dropdown)
