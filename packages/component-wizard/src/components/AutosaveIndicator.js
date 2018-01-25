import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { compose, withProps } from 'recompose'
import { Icon } from '@pubsweet/ui'
import { getFormValues } from 'redux-form'

import { getAutosave } from '../redux/autosave'

import classes from './AutosaveIndicator.local.scss'

const durationParser = lastUpdate => {
  const today = moment()
  const last = moment(lastUpdate)
  const duration = moment.duration(today.diff(last))
  return `Progress saved ${duration.humanize()} ago.`
}

const Indicator = ({
  isVisibile,
  autosave: { isFetching, error, lastUpdate },
}) =>
  isVisibile ? (
    <div className={classnames(classes.container)}>
      {isFetching && (
        <div className={classnames(classes['icon-container'])}>
          <div className={classnames(classes.rotate, classes.icon)}>
            <Icon size={16}>loader</Icon>
          </div>
          <span>Saving changes...</span>
        </div>
      )}

      {!isFetching &&
        lastUpdate && (
          <div className={classnames(classes['icon-container'])}>
            <div className={classnames(classes.icon)}>
              <Icon size={16}>check-circle</Icon>
            </div>
            <span>{durationParser(lastUpdate)}</span>
          </div>
        )}
      {!isFetching &&
        error && (
          <div className={classnames(classes['icon-container'])}>
            <div className={classnames(classes.icon)}>
              <Icon color="red" size={16}>
                alert-triangle
              </Icon>
            </div>
            <span className={classnames(classes['error-text'])} title={error}>
              Changes not saved
            </span>
          </div>
        )}
    </div>
  ) : null

export default compose(
  connect((state, { formName }) => ({
    autosave: getAutosave(state),
    form: !!getFormValues(formName || 'wizard')(state),
  })),
  withProps(({ autosave: { isFetching, error, lastUpdate }, form }) => ({
    isVisibile: form && Boolean(isFetching || lastUpdate || error),
  })),
)(Indicator)
