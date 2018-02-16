import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { get, isEmpty } from 'lodash'
import styled from 'styled-components'
import { Button, Icon } from '@pubsweet/ui'
import { compose, getContext } from 'recompose'

import { parseVersion, getFilesURL, downloadAll } from './utils'
import classes from './Dashboard.local.scss'

const DashboardCard = ({
  deleteProject,
  history,
  listView,
  project,
  version,
  setModal,
}) => {
  const { submitted, author, title, type, version: vers } = parseVersion(
    version,
  )
  const files = getFilesURL(get(version, 'files'))
  const status = get(project, 'status') || 'Draft'
  const hasFiles = !isEmpty(files)
  const abstract = get(version, 'metadata.abstract')
  const metadata = get(version, 'metadata')

  return (
    <div className={classes.card}>
      <div className={classes.leftSide}>
        <div
          className={classes.title}
          dangerouslySetInnerHTML={{ __html: title }} // eslint-disable-line
        />

        <div className={classes.quickInfo}>
          <div className={classes.status}>{status}</div>
          <div className={classes.version}>{`v${vers} ${
            submitted ? `- updated on ${submitted}` : ''
          }`}</div>
        </div>
      </div>
      <div className={classes.rightSide}>
        <div
          className={classnames({
            [classes.disabled]: !hasFiles,
            [classes.pointer]: true,
          })}
          onClick={() => (hasFiles ? downloadAll(files) : null)}
        >
          <Icon>download</Icon>
        </div>
        <div className={classes.pointer} onClick={() => deleteProject(project)}>
          <Icon>trash-2</Icon>
        </div>
        <div
          className={classes.pointer}
          onClick={() =>
            history.push(
              `/projects/${project.id}/versions/${version.id}/submit`,
            )
          }
        >
          <Icon>file-text</Icon>
        </div>
      </div>
      {!listView && (
        <div className={classes.expandedView}>
          <div className={classes.column3}>
            <div className={classes.column2}>
              <div>Submission author</div>
              <div>Abstract</div>
            </div>
            <div className={classes.column2}>
              <div>{author}</div>
              {abstract && (
                <a href="#" onClick={setModal(abstract)}>
                  view
                </a>
              )}
            </div>
          </div>
          <div className={classes.column3}>
            <div className={classes.column2}>
              <div>Submitted On</div>
              <div>Type</div>
            </div>
            <div className={classes.column2}>
              <div>{submitted}</div>
              <div>
                <span className={classes.status}>{type}</span>
              </div>
            </div>
          </div>
          <div className={classes.column3}>
            <div className={classes.column2}>
              <div>Handling Editor</div>
              <div>Reviewers</div>
            </div>
            <div className={classes.column2}>
              <Button className={classes.button} primary>
                Invite
              </Button>
              <Button className={classes.button} primary>
                Invite
              </Button>
            </div>
          </div>
        </div>
      )}
      {abstract && (
        <ViewAbstractContainer onClick={setModal(metadata)}>
          <Icon color="#667080" size={18}>
            eye
          </Icon>
          <span>View Abstract</span>
        </ViewAbstractContainer>
      )}
    </div>
  )
}

const ViewAbstractContainer = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;

  & > span {
    color: #667080;
    font-family: Helvetica;
    font-size: 14px;
    margin-left: 8px;
    text-align: left;
    text-decoration: underline;
  }
`

export default compose(
  getContext({
    setModal: PropTypes.func,
  }),
)(DashboardCard)
