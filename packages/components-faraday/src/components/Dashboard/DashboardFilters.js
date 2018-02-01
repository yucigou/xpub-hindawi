import React from 'react'
import { connect } from 'react-redux'
import { Icon, Menu } from '@pubsweet/ui'
import { compose, withHandlers } from 'recompose'

import classes from './Dashboard.local.scss'
import { changeFilter, changeSort } from './redux/filters'

const statusFilterOptions = [
  { label: 'All', value: 'all' },
  { label: 'Submitted', value: 'submitted' },
  { label: 'Draft', value: 'draft' },
]

const ownerFilterOptions = [
  { label: 'Everyone', value: 'all' },
  { label: 'My work', value: 'me' },
  { label: `Other's work`, value: 'other' },
]

const sortOptions = [
  { label: 'Newest first', value: 'newest' },
  { label: 'Oldest first', value: 'oldest' },
]

const DashboardFilters = ({
  view,
  status,
  createdAt,
  changeView,
  listView,
  changeFilter,
  changeSort,
  getFilterOptions,
  changeFilterValue,
}) => (
  <div className={classes.filtersContainer}>
    <div className={classes.filters}>
      Filter view:
      <div className={classes['filter-group']}>
        <span>Owner</span>
        <Menu
          onChange={changeFilterValue('owner')}
          options={getFilterOptions('owner')}
        />
      </div>
      <div className={classes['filter-group']}>
        <span>Status</span>
        <Menu
          onChange={changeFilterValue('status')}
          options={getFilterOptions('status')}
        />
      </div>
      <div className={classes['filter-group']}>
        <span>Sort</span>
        <Menu onChange={changeSort} options={sortOptions} />
      </div>
    </div>
    <div className={classes.viewMode} onClick={changeView}>
      <div className={classes.icon}>
        {listView ? <Icon>list</Icon> : <Icon>credit-card</Icon>}
      </div>
      {listView ? ' List' : ' Card'} View
    </div>
  </div>
)

export default compose(
  connect(null, { changeFilter, changeSort }),
  withHandlers({
    changeFilter: ({ changeFilter }) => filterKey => value => {
      changeFilter(filterKey, value)
    },
  }),
)(DashboardFilters)
