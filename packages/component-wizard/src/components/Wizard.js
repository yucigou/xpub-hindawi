import React from 'react'
import classnames from 'classnames'
import { withJournal } from 'xpub-journal'
import { compose, withHandlers, withState } from 'recompose'
import { TextField, YesOrNo } from '@pubsweet/ui'
import { AbstractEditor } from 'xpub-edit'

import classes from './Wizard.local.scss'
import { Dropdown, Steps, SortableList, ButtonGroup } from './'

const { Step } = Steps

const items = [
  { name: '1aurel', age: 2 },
  { name: '2costel' },
  { name: '3dorel' },
  { name: '4cocojambo' },
  { name: '5gicuta' },
]

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
    moveItem: ({ changeItems }) => (dragIndex, hoverIndex) => {
      changeItems(prev => SortableList.moveItem(prev, dragIndex, hoverIndex))
    },
  }),
  withHandlers({
    getSteps: ({ journal: { wizard } }) => () => wizard.map(w => w.label),
    toggleBtn: ({ changeBtn }) => () => changeBtn(v => !v),
    incrementStep: ({ changeStep, journal: { wizard } }) => () =>
      changeStep(step => (step === wizard.length ? step : step + 1)),
    decrementStep: ({ changeStep }) => () =>
      changeStep(step => (step <= 0 ? step : step - 1)),
    renderChild: ({ listItems, moveItem }) => data => {
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
        case 'text':
          return <TextField label={data.label} />
        case 'abstract':
          return (
            <div>
              <span>{data.label}</span>
              <AbstractEditor />
            </div>
          )
        case 'yesno':
          return (
            <div>
              <span>{data.label}</span>
              <YesOrNo name={data.label} />
            </div>
          )
        case 'sortable-list':
          return (
            <SortableList
              items={listItems}
              listItem={({ name, isDragging }) => (
                <div style={{ opacity: isDragging ? 0.5 : 1 }}>{name}</div>
              )}
              moveItem={moveItem}
            />
          )
        default:
          return <div>sorry</div>
      }
    },
  }),
)(Wizard)
