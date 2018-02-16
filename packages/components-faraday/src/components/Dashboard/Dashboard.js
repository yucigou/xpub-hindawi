import React from 'react'
import { get } from 'lodash'
import { Button } from '@pubsweet/ui'
import { compose, withHandlers } from 'recompose'

import classes from './Dashboard.local.scss'
import AbstractModal from './AbstractModal'
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
  getFilterOptions,
  changeFilterValue,
  filterValues,
  filterItems,
  abstractModal,
  setModal,
  ...rest
}) => (
  <div className={classes.root}>
    <div className={classes.header}>
      <div className={classes.heading}>Manuscripts</div>
      <div className={classes.headerButtons}>
        <Button onClick={createDraftSubmission} primary>
          New
        </Button>
      </div>
    </div>
    <DashboardFilters
      changeFilterValue={changeFilterValue}
      changeView={changeViewMode}
      getFilterOptions={getFilterOptions}
      listView={listView}
    />
    <DashboardItems
      deleteProject={deleteProject}
      list={getItems()}
      listView={listView}
    />
    <AbstractModal abstractModal={abstractModal} onClose={setModal()} />
  </div>
)

export default compose(
  withHandlers({
    getItems: ({
      filters,
      sortOrder,
      currentUser,
      dashboard,
      filterItems,
    }) => () => {
      const userItems = get(currentUser, 'admin')
        ? dashboard.all
        : dashboard.owner

      return filterItems(userItems).sort((a, b) => {
        if (sortOrder === 'newest') return a.created - b.created < 0
        return a.created - b.created > 0
      })
    },
  }),
)(Dashboard)
