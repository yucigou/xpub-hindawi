import React from 'react'
import classnames from 'classnames'
import { withJournal } from 'xpub-journal'
import { compose, withHandlers, withState } from 'recompose'

import classes from './Wizard.local.scss'
import { Dropdown, Steps, SortableList, ButtonGroup } from '../'

const { Step } = Steps

// const options = [
//   { label: 'opt 1', value: 'opt1' },
//   { label: 'caca 2', value: 'opt2' },
//   { label: 'maca 3', value: 'opt3' },
//   { label: 'vaca 4', value: 'opt4' },
// ]

const items = [
  { name: '1aurel', age: 2 },
  { name: '2costel' },
  { name: '3dorel' },
  { name: '4cocojambo' },
  { name: '5gicuta' },
]

const FirstStep = ({ title }) => (
  <div>
    <h3>{title}</h3>
  </div>
)

const Wizard = ({
  journal: { wizard },
  getSteps,
  step,
  incrementStep,
  decrementStep,
  moveItem,
  listItems,
  renderStep,
  renderChild,
  disabled,
  toggleBtn,
}) => {
  const { title, children: stepChildren, buttons: stepButtons } = wizard[step]
  return (
    <div className={classnames(classes.container)}>
      <Steps currentStep={step}>
        {getSteps().map((step, index) => (
          <Step index={index} key={step} title={step} />
        ))}
      </Steps>
      <button onClick={toggleBtn}>Toggle</button>
      <div className={classnames(classes.step)}>
        <h3>{title}</h3>
        {stepChildren && stepChildren.map((sc, index) => renderChild(sc))}
        <ButtonGroup
          buttons={stepButtons}
          disabled={disabled}
          onBack={decrementStep}
          onNext={incrementStep}
        />
      </div>
    </div>
  )
}

export default compose(
  withJournal,
  withState('step', 'changeStep', 0),
  withState('disabled', 'changeBtn', true),
  withState('listItems', 'changeItems', items),
  withHandlers({
    getSteps: ({ journal: { wizard } }) => () => wizard.map(w => w.label),
    toggleBtn: ({ changeBtn }) => () => changeBtn(v => !v),
    incrementStep: ({ changeStep, journal: { wizard } }) => () =>
      changeStep(step => (step === wizard.length ? step : step + 1)),
    decrementStep: ({ changeStep }) => () =>
      changeStep(step => (step <= 0 ? step : step - 1)),
    moveItem: ({ changeItems }) => (dragIndex, hoverIndex) => {
      changeItems(prev => SortableList.moveItem(prev, dragIndex, hoverIndex))
    },
    renderStep: () => stepIndex => {
      switch (stepIndex) {
        case 1:
          return <FirstStep title="First step" />
        case 2:
          return <FirstStep title="Second step" />
        case 3:
          return <FirstStep title="Third step" />
        case 4:
          return <FirstStep title="Fourth step" />
        default:
          return null
      }
    },
    renderChild: () => data => {
      switch (data.type) {
        case 'dropdown':
          return (
            <Dropdown
              key={data.label}
              label={data.label}
              options={data.values}
            />
          )
        case 'checkbox':
          return (
            <div key={data.label}>
              <input type="checkbox" />
              <label>{data.label}</label>
            </div>
          )
        default:
          return <div>sorry</div>
      }
    },
  }),
)(Wizard)
