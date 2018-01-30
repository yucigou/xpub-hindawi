import React from 'react'
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
    <div onClick={changeView}>View: {listView ? 'List' : 'Card'} </div>
  </div>
)

export default DashboardFilters
