import React from 'react'
import styled from 'styled-components'

import Item from './DashboardCard'
import withVersion from './withVersion'

const DashboardItem = withVersion(Item)

const DashboardItems = ({
  list,
  listView = true,
  deleteProject,
  showAbstractModal,
}) => (
  <div>
    {!list.length && (
      <Empty>Nothing to do at the moment. Please upload a manuscript.</Empty>
    )}

    {!!list.length && (
      <Section>
        {list.map(p => (
          <DashboardItem
            deleteProject={deleteProject}
            key={p.id}
            listView={listView}
            project={p}
            showAbstractModal={showAbstractModal}
          />
        ))}
      </Section>
    )}
  </div>
)

export default DashboardItems

// #region styles

const Empty = styled.div`
  display: flex;
  justify-content: center;
`

const Section = styled.div`
  margin: 0.5em 0;
`

// #endregion
