import React from 'react'
import classnames from 'classnames'
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
  <div className={classnames(classes['validated-text'])}>
    <span className={classnames(classes.label)}>{label}</span>
    <ValidatedField
      component={input => <Menu {...input} options={options} />}
      name={name}
      validate={[required]}
    />
  </div>
)

export const Label = ({ label, value }) => (
  <div className={classnames(classes['label-container'])}>
    <span className={classnames(classes.label)}>{label}</span>
    <span className={classnames(classes.value)}>{value}</span>
  </div>
)

export const DragHandle = () => (
  <div className={classnames(classes['drag-handle'])}>
    <Icon>chevron_up</Icon>
    <Icon size={16}>menu</Icon>
    <Icon>chevron_down</Icon>
  </div>
)
