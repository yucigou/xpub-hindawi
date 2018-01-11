import React from 'react'
import { compose, withHandlers, withState } from 'recompose'
import { withJournal } from 'xpub-journal'

import { Dropdown, Steps, SortableList } from '../'

const { Step } = Steps

const options = [
  { label: 'opt 1', value: 'opt1' },
  { label: 'caca 2', value: 'opt2' },
  { label: 'maca 3', value: 'opt3' },
  { label: 'vaca 4', value: 'opt4' },
]

const items = [
  { name: '1aurel' },
  { name: '2costel' },
  { name: '3dorel' },
  { name: '4cocojambo' },
  { name: '5gicuta' },
]

const AnItem = props => (
  <div
    style={{
      backgroundColor: 'cyan',
      marginBottom: 10,
      opacity: props.isDragging ? 0 : 1,
    }}
  >
    Un item aici: {props.name}
    {props.isDragging && <span>ma trag</span>}
    {props.isOver && <span>is over</span>}
  </div>
)

const Wizard = ({
  journal: { wizard },
  getSteps,
  step,
  incrementStep,
  moveItem,
  listItems,
}) => (
  <div>
    <Dropdown defaultValue={options[0]} label="My dropdown" options={options} />
    <Dropdown defaultValue={options[1]} label="Altceva" options={options} />
    <Dropdown defaultValue={options[3]} label="Trei" options={options} />
    <button onClick={incrementStep}>Increment step</button>
    <Steps currentStep={step}>
      {getSteps().map((step, index) => (
        <Step index={index} key={step} title={step} />
      ))}
    </Steps>
    <hr style={{ marginTop: 40 }} />
    <SortableList items={listItems} listItem={AnItem} moveItem={moveItem} />
  </div>
)

export default compose(
  withJournal,
  withState('step', 'changeStep', 1),
  withState('listItems', 'changeItems', items),
  withHandlers({
    getSteps: ({ journal: { wizard } }) => () => wizard.map(w => w.label),
    incrementStep: ({ changeStep }) => () => changeStep(step => step + 1),
    moveItem: ({ changeItems }) => (dragIndex, hoverIndex) => {
      changeItems(prev => SortableList.moveItem(prev, dragIndex, hoverIndex))
    },
  }),
)(Wizard)
