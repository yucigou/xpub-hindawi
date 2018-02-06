import { get, isEmpty } from 'lodash'

import manuscriptTypes from './manuscript-types'

const requiredTypes = manuscriptTypes
  .filter(t => t.abstractRequired)
  .map(t => t.value)

export const parseEmptyHtml = value => {
  if (value && value.replace('<p></p>', '').replace('<h1></h1>', '')) {
    return undefined
  }
  return 'Required'
}

export const requiredBasedOnType = (value, formValues) => {
  if (
    requiredTypes.includes(get(formValues, 'metadata.type')) &&
    (isEmpty(get(formValues, 'metadata.abstract')) || parseEmptyHtml(value))
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

export const requiredFiles = (valus, formValues) => {
  const manuscripts = get(formValues, 'files.manuscripts')
  if (manuscripts && manuscripts.length === 0) {
    return 'At least one main manuscript file is needed.'
  }
  return undefined
}
