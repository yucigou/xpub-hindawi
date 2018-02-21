import React from 'react'
import { Menu } from '@pubsweet/ui'
import { compose, withHandlers } from 'recompose'

import classes from './Dashboard.local.scss'

const sortOptions = [
  { label: 'Newest first', value: 'newest' },
  { label: 'Oldest first', value: 'oldest' },
]

const DashboardFilters = ({
  view,
  status,
  createdAt,
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
  </div>
)

export default compose(
  withHandlers({
    changeFilter: ({ changeFilter }) => filterKey => value => {
      changeFilter(filterKey, value)
    },
  }),
)(DashboardFilters)
