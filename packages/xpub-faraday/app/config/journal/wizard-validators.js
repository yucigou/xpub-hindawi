import { get, isEmpty } from 'lodash'

import manuscriptTypes from './manuscript-types'

const requiredTypes = manuscriptTypes
  .filter(t => t.abstractRequired)
  .map(t => t.value)

const parseAbstract = value => {
  if (value && value.replace('<p></p>', '').replace('<h1></h1>', '')) {
    return undefined
  }
  return 'Required'
}

export const requiredBasedOnType = (value, formValues) => {
  if (
    requiredTypes.includes(get(formValues, 'metadata.type')) &&
    (isEmpty(get(formValues, 'metadata.abstract')) || parseAbstract(value))
  ) {
    return 'Required'
  }
  return undefined
}

export const editModeEnabled = value => {
  if (value) {
    return 'You have some unsaved author details.'
  }
  return undefined
}
