import React from 'react'
import moment from 'moment'
import classnames from 'classnames'
import { compose, withProps } from 'recompose'
import { Icon } from '@pubsweet/ui'

import classes from './AutosaveIndicator.local.scss'

const durationParser = lastUpdate => {
  const today = moment()
  const last = moment(lastUpdate)
  const duration = moment.duration(today.diff(last))
  return `Last saved: ${duration.humanize()} ago.`
}

const Indicator = ({ isVisibile, isFetching, error, lastUpdate }) =>
  isVisibile ? (
    <div className={classnames(classes.container)}>
      {isFetching && (
        <div className={classnames(classes['icon-container'])}>
          <div className={classnames(classes.rotate, classes.icon)}>
            <Icon size={16}>refresh-cw</Icon>
          </div>
          <span>Saving changes...</span>
        </div>
      )}

      {!isFetching && lastUpdate && <span>{durationParser(lastUpdate)}</span>}
      {!isFetching &&
        error && (
          <div className={classnames(classes['icon-container'])}>
            <div className={classnames(classes.icon)}>
              <Icon color="red" size={16}>
                slash
              </Icon>
            </div>
            <span className={classnames(classes['error-text'])}>{error}</span>
          </div>
        )}
    </div>
  ) : null

export default compose(
  withProps(({ isFetching, lastUpdate, error }) => ({
    isVisibile: Boolean(isFetching || lastUpdate || error),
  })),
)(Indicator)
