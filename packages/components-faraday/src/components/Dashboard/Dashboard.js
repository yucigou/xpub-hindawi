import React from 'react'
import { Button } from '@pubsweet/ui'

import classes from './Dashboard.local.scss'
import DashboardItems from './DashboardItems'
import DashboardFilters from './DashboardFilters'

const Dashboard = ({
  currentUser,
  dashboard,
  listView,
  changeViewMode,
  deleteProject,
  createDraftSubmission,
}) => (
  <div className={classes.root}>
    <div className={classes.header}>
      <div className={classes.heading}>Manuscripts</div>
      <Button onClick={createDraftSubmission} primary>
        New
      </Button>
    </div>
    <DashboardFilters changeView={changeViewMode} listView={listView} />
    <DashboardItems dashboard={dashboard} listView={listView} />
  </div>
)

export default Dashboard
