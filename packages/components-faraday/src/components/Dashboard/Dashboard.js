import React from 'react'
import { get } from 'lodash'
import { Button } from '@pubsweet/ui'
import styled from 'styled-components'
import { compose, withHandlers } from 'recompose'
import { withModal } from 'pubsweet-component-modal/src/components'

import AbstractModal from './AbstractModal'
import DashboardItems from './DashboardItems'
import DashboardFilters from './DashboardFilters'

const Dashboard = ({
  createDraftSubmission,
  currentUser,
  dashboard,
  deleteProject,
  filters,
  getItems,
  getFilterOptions,
  changeFilterValue,
  filterValues,
  filterItems,
  showAbstractModal,
  ...rest
}) => (
  <Root>
    <Header>
      <Heading>Manuscripts</Heading>
      <HeaderButtons>
        <Button onClick={createDraftSubmission} primary>
          New
        </Button>
      </HeaderButtons>
    </Header>
    <DashboardFilters
      changeFilterValue={changeFilterValue}
      getFilterOptions={getFilterOptions}
    />
    <DashboardItems
      deleteProject={deleteProject}
      list={getItems()}
      showAbstractModal={showAbstractModal}
    />
  </Root>
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

// #region styles

const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 60em;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`

const Heading = styled.div`
  color: ${({ theme }) => theme.colorPrimary};
  font-size: 1.6em;
  text-transform: uppercase;
`

const HeaderButtons = styled.div`
  display: flex;
`

// #endregion
