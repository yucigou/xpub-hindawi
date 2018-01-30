import React from 'react'

import Item from './DashboardCard'
import withVersion from './withVersion'
import classes from './Dashboard.local.scss'

const DashboardItem = withVersion(Item)

const DashboardItems = ({ dashboard, listView = true }) => (
  <div>
    {!dashboard.owner.length &&
      !dashboard.reviewer.length && (
        <div className={classes.empty}>
          Nothing to do at the moment. Please upload a manuscript.
        </div>
      )}

    {!!dashboard.owner.length && (
      <div className={classes.section}>
        {dashboard.owner.map(p => (
          <DashboardItem key={p.id} listView={listView} project={p} />
        ))}
      </div>
    )}
  </div>
)

export default DashboardItems
