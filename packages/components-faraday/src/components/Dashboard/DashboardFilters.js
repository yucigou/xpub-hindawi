import React from 'react'
import { Menu } from '@pubsweet/ui'
import { compose, withHandlers } from 'recompose'
import styled from 'styled-components'

const sortOptions = [
  { label: 'Newest first', value: 'newest' },
  { label: 'Oldest first', value: 'oldest' },
]

const DashboardFilters = ({
  view,
  status,
  createdAt,
  listView,
  changeFilter,
  changeSort,
  getFilterOptions,
  changeFilterValue,
}) => (
  <Root>
    <FiltersContainer>
      Filter view:
      <FilterGroup>
        <span>Owner</span>
        <Menu
          onChange={changeFilterValue('owner')}
          options={getFilterOptions('owner')}
        />
      </FilterGroup>
      <FilterGroup>
        <span>Status</span>
        <Menu
          onChange={changeFilterValue('status')}
          options={getFilterOptions('status')}
        />
      </FilterGroup>
      <FilterGroup>
        <span>Sort</span>
        <Menu onChange={changeSort} options={sortOptions} />
      </FilterGroup>
    </FiltersContainer>
  </Root>
)

export default compose(
  withHandlers({
    changeFilter: ({ changeFilter }) => filterKey => value => {
      changeFilter(filterKey, value)
    },
  }),
)(DashboardFilters)

// #region styles

const Root = styled.div`
  border-bottom: ${({ theme }) => theme.borderDefault};
  color: ${({ theme }) => theme.colorPrimary};
  display: flex;
  justify-content: space-between;
  margin: 1em 0;
  padding-bottom: 1em;
`

const FiltersContainer = styled.div`
  align-items: flex-end;
  display: flex;

  > span {
    border: ${({ theme }) => theme.borderDefault};
    margin: 0 0.5em;
    padding: 0 5px;
  }
`

const FilterGroup = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;

  > span {
    margin-left: 10px;
  }
`

// #endregion
