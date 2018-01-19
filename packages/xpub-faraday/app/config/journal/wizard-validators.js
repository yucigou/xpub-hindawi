import { get, isEmpty } from 'lodash'

import manuscriptTypes from './manuscript-types'

const requiredTypes = manuscriptTypes
  .filter(t => t.abstractRequired)
  .map(t => t.value)

export const requiredBasedOnType = (value, formValues) => {
  if (
    requiredTypes.includes(get(formValues, 'metadata.type')) &&
    isEmpty(get(formValues, 'metadata.abstract'))
  ) {
    return 'Required'
  }
  return undefined
}

export const parseAbstract = value => {
  if (value && value.replace('<p></p>', '').replace('<h1></h1>', '')) {
    return undefined
  }
  return 'Required'
}
