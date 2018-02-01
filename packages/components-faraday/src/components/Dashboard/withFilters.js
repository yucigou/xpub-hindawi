import { get } from 'lodash'
import { compose, withState, withHandlers } from 'recompose'

export default config => Component => {
  const filterFns = Object.entries(config).map(([filterKey, { filterFn }]) => ({
    key: filterKey,
    fn: filterFn,
  }))
  const filterValues = Object.keys(config).reduce(
    (acc, el) => ({ ...acc, [el]: '' }),
    {},
  )
  return compose(
    withState('filterValues', 'setFilterValues', filterValues),
    withHandlers({
      getFilterOptions: () => key => get(config, `${key}.options`) || [],
      changeFilterValue: ({ setFilterValues }) => filterKey => value => {
        setFilterValues(v => ({
          ...v,
          [filterKey]: value,
        }))
      },
      filterItems: ({ filterValues, ...props }) => items =>
        filterFns.reduce(
          (acc, { key, fn }) => acc.filter(fn(filterValues[key], props)),
          items,
        ),
    }),
  )(Component)
}
