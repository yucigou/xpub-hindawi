import React from 'react'
import { get } from 'lodash'
import { Button } from '@pubsweet/ui'
import { connect } from 'react-redux'
import { compose, withHandlers } from 'recompose'

import classes from './Dashboard.local.scss'
import DashboardItems from './DashboardItems'
import DashboardFilters from './DashboardFilters'

const Dashboard = ({
  changeViewMode,
  createDraftSubmission,
  currentUser,
  dashboard,
  deleteProject,
  listView,
  filters,
  getItems,
}) => (
  <div className={classes.root}>
    <div className={classes.header}>
      <div className={classes.heading}>Manuscripts</div>
      <Button onClick={createDraftSubmission} primary>
        New
      </Button>
    </div>
    <DashboardFilters changeView={changeViewMode} listView={listView} />
    <DashboardItems
      deleteProject={deleteProject}
      list={getItems()}
      listView={listView}
    />
  </div>
)

export default compose(
  connect(state => ({
    filters: state.filters.filter,
    sortOrder: state.filters.sortValue,
  })),
  withHandlers({
    getItems: ({ filters, sortOrder, currentUser, dashboard }) => () => {
      const userItems = get(currentUser, 'admin')
        ? dashboard.all
        : dashboard.owner
      const statusItems =
        filters.status === 'all'
          ? userItems
          : userItems.filter(item => {
              const itemStatus = get(item, 'status')
              if (!itemStatus && filters.status === 'draft') {
                return true
              }
              return itemStatus === filters.status
            })
      const ownerItems =
        filters.owner === 'all'
          ? statusItems
          : statusItems.filter(item => {
              const itemOwnerIds = item.owners.map(o => o.id)
              if (filters.owner === 'me') {
                return itemOwnerIds.includes(currentUser.id)
              } else if (filters.owner === 'other') {
                return !itemOwnerIds.includes(currentUser.id)
              }
              return false
            })
      return ownerItems.sort((a, b) => {
        if (sortOrder === 'newest') return a.created - b.created < 0
        return a.created - b.created > 0
      })
    },
  }),
)(Dashboard)
