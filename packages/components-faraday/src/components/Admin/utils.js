import { pick, map } from 'lodash'

export const getRoleOptions = journal =>
  map(journal.roles, (value, key) => ({ label: value, value: key }))

export const setAdmin = values => {
  const newValues = { ...values }
  if (newValues.roles && newValues.roles.includes('admin')) {
    newValues.admin = true
  } else {
    newValues.admin = false
  }

  return newValues
}

export const parseUpdateUser = values => {
  const valuesToSave = [
    'admin',
    'firstName',
    'lastName',
    'affiliation',
    'title',
    'roles',
    'rev',
  ]

  const newValues = setAdmin(values)
  return pick(newValues, valuesToSave)
}
