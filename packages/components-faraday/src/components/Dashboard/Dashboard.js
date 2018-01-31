import React from 'react'
import { get } from 'lodash'
import { Button } from '@pubsweet/ui'

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
      list={get(currentUser, 'admin') ? dashboard.all : dashboard.owner}
      listView={listView}
    />
  </div>
)

export default Dashboard
