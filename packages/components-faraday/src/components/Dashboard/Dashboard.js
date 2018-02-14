import React from 'react'
import { get, isEmpty } from 'lodash'
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
  getFilterOptions,
  changeFilterValue,
  filterValues,
  filterItems,
  abstractModal,
  setModal,
  history,
  ...rest
}) => (
  <div className={classes.root}>
    <div className={classes.header}>
      <div className={classes.heading}>Manuscripts</div>
      <div className={classes.headerButtons}>
        <Button
          className={classes['admin-button']}
          onClick={() => history.push('admin')}
          primary
        >
          Admin dashboard
        </Button>
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
    {!isEmpty(abstractModal) && (
      <div className={classes.modal}>
        <div className={classes.modalContent}>
          <div
            className={classes.modalText}
            dangerouslySetInnerHTML={{ __html: abstractModal }} // eslint-disable-line
          />
          <Button onClick={setModal()}>Close</Button>
        </div>
      </div>
    )}
  </div>
)

export default compose(
  connect(state => ({
    filters: state.filters.filter,
    sortOrder: state.filters.sortValue,
  })),
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
