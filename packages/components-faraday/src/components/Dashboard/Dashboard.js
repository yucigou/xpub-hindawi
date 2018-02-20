import React from 'react'
import { get } from 'lodash'
import { Button } from '@pubsweet/ui'
import styled from 'styled-components'
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
  abstractModal,
  setModal,
  showModal,
  ...rest
}) => (
  <div className={classes.root}>
    <div className={classes.header}>
      <div className={classes.heading}>Manuscripts</div>
      <div className={classes.headerButtons}>
        <Button onClick={createDraftSubmission} primary>
          New
        </Button>
        <Button
          onClick={() =>
            showModal({
              onConfirm: () => alert('confirm'),
              costel: true,
            })
          }
          primary
        >
          Show modal
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
    <AbstractModal abstractModal={abstractModal} onClose={setModal()} />
  </div>
)

const ModalRoot = styled.div`
  width: 300px;
  height: 400px;
  background-color: gray;
`

const ModalComponent = ({ hideModal, dismissable, onConfirm, costel }) => (
  <ModalRoot onClick={dismissable ? hideModal : null}>
    This is our custom modal component.
    <div>
      <button onClick={onConfirm}>Yes</button>
      <button onClick={hideModal}>Hide modal</button>
      <span>{costel ? 'e costel' : 'nu e'}</span>
    </div>
  </ModalRoot>
)

export default compose(
  withModal({
    modalComponent: ModalComponent,
    overlayColor: 'rgba(255, 0,0,0.8)',
  }),
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
