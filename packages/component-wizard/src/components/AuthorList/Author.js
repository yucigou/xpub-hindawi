import React from 'react'
import classnames from 'classnames'
import { Icon } from '@pubsweet/ui'

import { Label } from './FormItems'
import classes from './AuthorList.local.scss'

export default ({
  firstName,
  middleName,
  lastName,
  email,
  affiliation,
  country,
  dragHandle,
  isOver,
  countryParser,
  removeAuthor,
  isSubmitting,
  isCorresponding,
  setAsCorresponding,
  parseAuthorType,
  editedAuthor,
  setAuthorEdit,
  index,
}) => (
  <div
    className={classnames({
      [classes.author]: true,
      [classes.dashed]: isOver,
    })}
  >
    {!isOver && dragHandle}
    <div
      className={classnames({
        [classes.container]: true,
        [classes.hide]: isOver,
      })}
    >
      <span className={classnames(classes.title)}>
        {parseAuthorType(isSubmitting, isCorresponding)}
      </span>
      <div className={classnames(classes.row)}>
        <Label label="First name" value={firstName} />
        <Label label="Middle name" value={middleName} />
        <Label label="Last name" value={lastName} />
      </div>
      <div className={classnames(classes.row)}>
        <Label label="Email" value={email} />
        <Label label="Affiliation" value={affiliation} />
        <Label label="Country" value={countryParser(country)} />
      </div>
    </div>
    <div className={classnames(classes['button-container'])}>
      {!isSubmitting && (
        <div
          className={classnames(classes['delete-button'])}
          onClick={removeAuthor(email)}
          title="Delete author"
        >
          <Icon>trash</Icon>
        </div>
      )}
      {!isCorresponding && (
        <div
          className={classnames(classes.corresponding)}
          onClick={setAsCorresponding(email)}
          title="Set as corresponding author"
        >
          <Icon>mail</Icon>
        </div>
      )}
      {editedAuthor < 0 && (
        <div
          className={classnames(classes.corresponding)}
          onClick={setAuthorEdit(index)}
          title="Edit author"
        >
          <Icon>edit-2</Icon>
        </div>
      )}
    </div>
  </div>
)
