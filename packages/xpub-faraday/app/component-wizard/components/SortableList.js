import React from 'react'
import { compose } from 'recompose'
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'

const itemSource = {
  beginDrag(props) {
    return { index: props.index }
  },
}

const itemTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return
    }

    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect() // eslint-disable-line
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
    const clientOffset = monitor.getClientOffset()
    const hoverClientY = clientOffset.y - hoverBoundingRect.top

    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return
    }

    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return
    }

    props.moveItem(dragIndex, hoverIndex)
    monitor.getItem().index = hoverIndex
  },
}

const Item = ({ name, isDragging, connectDragSource, connectDropTarget }) =>
  connectDragSource(
    connectDropTarget(
      <div style={{ backgroundColor: 'wheat', margin: 5 }}>{name}</div>,
    ),
  )

const DecoratedItem = compose(
  DropTarget('item', itemTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
  })),
  DragSource('item', itemSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  })),
)(Item)

const SortableList = ({ items, moveItem }) => (
  <div>
    {items.map((item, i) => (
      <DecoratedItem
        index={i}
        key={item.name}
        moveItem={moveItem}
        name={item.name}
      />
    ))}
  </div>
)

export default SortableList
