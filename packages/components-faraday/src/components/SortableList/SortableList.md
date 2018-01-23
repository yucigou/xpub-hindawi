A sortable list implemented with `react-dnd`.

## Props

|    Prop    |                                                                 Description                                                                  | Required |        Default        |
| :--------: | :------------------------------------------------------------------------------------------------------------------------------------------: | :------: | :-------------------: |
|   items    |                                                       The items of the sortable list.                                                        |   true   |          []           |
|  listItem  | A React component that will be rendered for each item of the list. Receives `isDragging`, `isOver` and all other props from the items array. |   true   |         none          |
|  moveItem  |       Function to be called when moving an item through the list. SortableList will provide the dragIndex of hoverIndex of the items.        |   true   | SortableList.moveItem |
| dragHandle |                            A React component for the drag handle. If not present, the whole item can be dragged.                             |  false   |         none          |
|  dropItem  |                            Function to be called when dropping an item. The index of the dragged item is passed.                             |  false   |         none          |

## Usage

### Pass in a list of users

```js
const items = [
  {firstName: 'John', lastName: 'Doe'},
  {firstName: 'Michael', lastName: 'Jackson'},
  {firstName: 'David', lastName: 'Blaine'},
]

const Item = ({ isOver, isDragging, ...rest }) =>
  <div>`${rest.firstName} ${rest.lastName}`</div>

const DragHandle

<SortableList
  items={items}
  listItem={Item}
  moveItem={(dragIndex, hoverIndex) => change items}
/>
```

### With custom drag handle
```js
const DragHandle = () => <div>Drag me!</div>

const ItemWithDragHandle = ({ dragHandle, ...rest }) => <div>
  {dragHandle}
  <span>Rest of the item' content.</span>
</div>

<SortableList
  ...
  listItem={ItemWithDragHandle}
  dragHandle={DragHandle}
  ...
/>
```

### How to move items around

To move items of the parent container whenever `moveItem` function is called we can use the `SortableList.moveItem` helper. More info in the example below.

```js
const Container = ({ moveItem, items }) => <div>
  ...
  <SortableList
    items={items}
    listItem={Item}
    moveItem={moveItem}
  />
  ...
</div>
```
Enhanced using recompose
```js
const MoveExample = compose(
  withState('items', 'setItems', [{name: 'John'}, {name: 'Nancy'}, {name: 'Adam'}]),
  withHandlers({
    moveItem: ({ setItems, items }) => (dragIndex, hoverIndex) => {
      setItems(prevItems => SortableList.moveItem(prevItems, dragIndex, hoverIndex))
    }
  })
)(Container)
```
