import { get } from 'lodash'

import manuscriptTypes from './manuscript-types'

const requiredTypes = manuscriptTypes
  .filter(t => t.abstractRequired)
  .map(t => t.value)

export const requiredBasedOnType = (value, formValues) => {
  if (requiredTypes.includes(get(formValues, 'metadata.type'))) {
    return 'Required'
  }
  return undefined
}
