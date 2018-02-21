import React from 'react'

import Author from './Author'

export default ({
  authors,
  editIndex,
  setFormAuthors,
  removeAuthor,
  countryParser,
  editComponent,
  setAuthorEdit,
  parseAuthorType,
  setAsCorresponding,
  ...rest
}) => (
  <div>
    {authors.map(
      (author, index) =>
        index === editIndex ? (
          React.createElement(editComponent, {
            key: 'author-editor',
            authors,
            index,
            initialValues: {
              edit: author,
            },
            setAuthors: setFormAuthors,
            setAuthorEdit,
            countryParser,
            parseAuthorType,
            setAsCorresponding,
            ...author,
          })
        ) : (
          <Author
            key={author.firstName}
            {...author}
            countryParser={countryParser}
            index={index}
            parseAuthorType={parseAuthorType}
            removeAuthor={removeAuthor}
            setAsCorresponding={setAsCorresponding}
            {...rest}
          />
        ),
    )}
  </div>
)
