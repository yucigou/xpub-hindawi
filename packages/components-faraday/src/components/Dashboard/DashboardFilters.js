import React from 'react'
import { Icon } from '@pubsweet/ui'

import classes from './Dashboard.local.scss'

const DashboardFilters = ({
  view,
  status,
  createdAt,
  changeView,
  listView,
}) => (
  <div className={classes.filtersContainer}>
    <div className={classes.filters}>
      Filter view:
      <span> My work </span>
      <span> Type </span>
      <span> Status </span>
      <span> Newest on top </span>
    </div>
    <div className={classes.viewMode} onClick={changeView}>
      <div className={classes.icon}>
        {listView ? <Icon>list</Icon> : <Icon>credit-card</Icon>}
      </div>
      {listView ? ' List' : ' Card'} View
    </div>
  </div>
)

export default DashboardFilters
