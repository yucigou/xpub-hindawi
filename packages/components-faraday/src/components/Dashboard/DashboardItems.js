import React from 'react'

import Item from './DashboardCard'
import withVersion from './withVersion'
import classes from './Dashboard.local.scss'

const DashboardItem = withVersion(Item)

const DashboardItems = ({
  list,
  listView = true,
  deleteProject,
  showAbstractModal,
}) => (
  <div>
    {!list.length && (
      <div className={classes.empty}>
        Nothing to do at the moment. Please upload a manuscript.
      </div>
    )}

    {!!list.length && (
      <div className={classes.section}>
        {list.map(p => (
          <DashboardItem
            deleteProject={deleteProject}
            key={p.id}
            listView={listView}
            project={p}
            showAbstractModal={showAbstractModal}
          />
        ))}
      </div>
    )}
  </div>
)

export default DashboardItems
