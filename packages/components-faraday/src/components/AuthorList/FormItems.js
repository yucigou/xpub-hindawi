import React from 'react'
import classnames from 'classnames'
import styled from 'styled-components'
import { required } from 'xpub-validators'
import { TextField, Menu, ValidatedField, Icon } from '@pubsweet/ui'

import classes from './FormItems.local.scss'

export const ValidatedTextField = ({
  label,
  name,
  isRequired,
  validators = [],
}) => {
  const v = [isRequired && required, ...validators].filter(Boolean)
  return (
    <div className={classnames(classes['validated-text'])}>
      <span className={classnames(classes.label)}>{label}</span>
      <ValidatedField component={TextField} name={name} validate={v} />
    </div>
  )
}

export const MenuItem = ({ label, name, options }) => (
  <div className={classnames(classes['validated-text'], classes['fix-height'])}>
    <span className={classnames(classes.label)}>{label}</span>
    <ValidatedField
      component={input => <Menu {...input} options={options} />}
      name={name}
      validate={[required]}
    />
  </div>
)

export const Label = ({ label, value }) => (
  <LabelContainer>
    <span>{label}</span>
    <span>{value}</span>
  </LabelContainer>
)

export const DragHandle = () => (
  <div className={classnames(classes['drag-handle'])}>
    <Icon>chevron_up</Icon>
    <Icon size={16}>menu</Icon>
    <Icon>chevron_down</Icon>
  </div>
)

// #region styled-components
const LabelContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px;
  width: ${({ width }) => `${width || 175}px`};

  span:first-child {
    font-size: 14px;
    font-weight: 300;
    overflow: hidden;
    text-transform: uppercase;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  span:last-child {
    font-size: 16px;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`
// #endregion
