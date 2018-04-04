import moment from 'moment'
import { get, find } from 'lodash'

export const parseTitle = version => {
  const title = get(version, 'metadata.title')
  if (title) {
    return title.replace(/<p[^>]*>/g, '').replace(/<\/p>/g, '')
  }
  return 'Untitled'
}

export const parseAuthor = version => {
  const author = find(get(version, 'authors'), a => a.isSubmitting)
  return author ? `${author.firstName} ${author.lastName}` : 'N/A'
}

export const parseType = version => {
  const type = get(version, 'metadata.type')
  return type ? type.replace('-', ' ') : 'N/A'
}

export const parseSubmissionDate = version => {
  const submitted = get(version, 'submitted')
  const submittedDate = moment(submitted)
  const today = moment()
  const daysAgo = moment.duration(today - moment(submitted)).days()
  return submitted
    ? `${submittedDate.format('DD.MM.YYYY')} ${
        daysAgo > 0 ? `(${daysAgo} days)` : ''
      }`
    : 'N/A'
}

export const parseVersion = version => ({
  author: parseAuthor(version),
  title: parseTitle(version),
  submitted: parseSubmissionDate(version),
  type: parseType(version),
  abstract: get(version, 'metadata.abstract'),
  version: get(version, 'version'),
})

export const parseJournalIssue = (journal, metadata) =>
  journal.issueTypes.find(t => t.value === get(metadata, 'issue'))

export const mapStatusToLabel = status => {
  switch (status) {
    case 'he-invited':
      return 'Handling Editor Assigned'
    case 'submitted':
      return 'Submitted'
    case 'under-review':
      return 'Under Review'
    default:
      return 'Draft'
  }
}

export const handleError = fn => e => {
  fn(get(JSON.parse(e.response), 'error') || 'Oops! Something went wrong!')
}

const emailRegex = new RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, //eslint-disable-line
)

export const emailValidator = value =>
  emailRegex.test(value) ? undefined : 'Invalid email'
