const initialState = {
  filter: {
    status: 'all',
    owner: 'all',
  },
  sortValue: 'newest',
}

const CHANGE_FILTER = 'filters/CHANGE_FILTER'
const CHANGE_SORT = 'filters/CHANGE_SORT'

export const changeFilter = (filterKey, value) => ({
  type: CHANGE_FILTER,
  filterKey,
  value,
})

export const changeSort = value => ({
  type: CHANGE_SORT,
  value,
})

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_FILTER:
      return {
        ...state,
        filter: {
          ...state.filter,
          [action.filterKey]: action.value,
        },
      }
    case CHANGE_SORT:
      return {
        ...state,
        sortValue: action.value,
      }
    default:
      return state
  }
}
