import React from 'react'
import { get, find } from 'lodash'
import moment from 'moment'
import { Icon } from '@pubsweet/ui'

import classes from './Dashboard.local.scss'

const DashboardCard = ({ project, listView, version }) => {
  const author = find(get(version, 'authors'), a => a.isSubmitting)
  const submitted = get(version, 'submitted')
  // const abstract = get(version, 'metadata.abstract')
  const type = get(version, 'metadata.type')

  return (
    <div className={classes.card}>
      <div className={classes.leftSide}>
        <div className={classes.title}>
          {get(version, 'metadata.title') || 'Untitled'}
        </div>
        <div className={classes.quickInfo}>
          <div className={classes.status}>
            {get(project, 'status') || 'Draft'}
          </div>
        </div>
      </div>
      <div className={classes.rightSide}>
        <Icon>download</Icon>
        <a href={`/projects/${project.id}/versions/${version.id}/manuscript`}>
          Details
        </a>
      </div>
      {!listView && (
        <div className={classes.expandedView}>
          <div className={classes.column3}>
            <div className={classes.column2}>
              <div>Submission author</div>
              <div>Abstract</div>
            </div>
            <div className={classes.column2}>
              <div>{author ? author.firstName : 'N/A'}</div>
              <a>View</a>
            </div>
          </div>
          <div className={classes.column3}>
            <div className={classes.column2}>
              <div>Submitted On</div>
              <div>Type</div>
            </div>
            <div className={classes.column2}>
              <div>
                {submitted ? moment(submitted).format('DD-MM-YYYY') : 'N/A'}
              </div>
              <div>
                <span className={classes.status}>{type || 'N/A'}</span>
              </div>
            </div>
          </div>
          <div className={classes.column3}>
            <div className={classes.column2}>
              <div>Handling Editor</div>
              <div>Reviewers</div>
            </div>
            <div className={classes.column2}>
              <div>Invite</div>
              <div>Invite</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DashboardCard
