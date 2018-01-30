import { get } from 'lodash'

export const parseTitle = version => {
  const title = get(version, 'metadata.title')
  if (title) {
    return title.replace(/<p[^>]*>/g, '').replace(/<\/p>/g, '')
  }
  return 'Untitled'
}
