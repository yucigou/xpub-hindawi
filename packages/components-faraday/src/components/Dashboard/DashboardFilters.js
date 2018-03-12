import React from 'react'
import { Menu, th } from '@pubsweet/ui'
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
          inline
          onChange={changeFilterValue('owner')}
          options={getFilterOptions('owner')}
        />
      </FilterGroup>
      <FilterGroup>
        <span>Status</span>
        <Menu
          inline
          onChange={changeFilterValue('status')}
          options={getFilterOptions('status')}
        />
      </FilterGroup>
      <FilterGroup>
        <span>Sort</span>
        <Menu inline onChange={changeSort} options={sortOptions} />
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
  border-bottom: ${th('borderDefault')};
  color: ${th('colorPrimary')};
  display: flex;
  justify-content: space-between;
  margin: calc(${th('subGridUnit')}*2) 0;
  padding-bottom: calc(${th('subGridUnit')}*2);
`

const FiltersContainer = styled.div`
  align-items: center;
  display: flex;

  > span {
    border: ${th('borderDefault')};
    margin: 0 0.5em;
    padding: 0 calc(${th('subGridUnit')});
  }
`

const FilterGroup = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  margin-left: calc(${th('subGridUnit')}*2);
`

// #endregion
