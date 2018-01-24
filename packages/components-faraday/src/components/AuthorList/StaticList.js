import React from 'react'

import Author from './Author'

export default ({
  authors,
  editIndex,
  removeAuthor,
  countryParser,
  editComponent,
  setAuthorEdit,
  parseAuthorType,
  ...rest
}) => (
  <div>
    {authors.map(
      (a, index) =>
        index === editIndex ? (
          React.createElement(editComponent, {
            key: 'author-editor',
            index,
            initialValues: {
              edit: a,
            },
            setAuthorEdit,
            countryParser,
            parseAuthorType,
          })
        ) : (
          <Author
            key={a.firstName}
            {...a}
            countryParser={countryParser}
            parseAuthorType={parseAuthorType}
            removeAuthor={removeAuthor}
            {...rest}
          />
        ),
    )}
  </div>
)
