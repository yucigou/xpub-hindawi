import React from 'react'
import { get } from 'lodash'
import { Button } from '@pubsweet/ui'
import { compose, withHandlers } from 'recompose'
import { withModal } from 'pubsweet-component-modal/src/components'

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
  showAbstractModal,
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
      showAbstractModal={showAbstractModal}
    />
  </div>
)

export default compose(
  withModal({
    modalComponent: AbstractModal,
  }),
  withHandlers({
    showAbstractModal: ({ showModal }) => metadata => () => {
      showModal({
        metadata,
        dismissable: true,
      })
    },
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
