import React from 'react'
import { compose, withHandlers, withState } from 'recompose'
import { withJournal } from 'xpub-journal'

import { Dropdown, Steps } from '../'

const { Step } = Steps

const options = [
  { label: 'opt 1', value: 'opt1' },
  { label: 'caca 2', value: 'opt2' },
  { label: 'maca 3', value: 'opt3' },
  { label: 'vaca 4', value: 'opt4' },
]

const Wizard = ({ journal: { wizard }, getSteps, step, incrementStep }) => (
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
  </div>
)

export default compose(
  withJournal,
  withState('step', 'changeStep', 1),
  withHandlers({
    getSteps: ({ journal: { wizard } }) => () => wizard.map(w => w.label),
    incrementStep: ({ changeStep }) => () => changeStep(step => step + 1),
  }),
)(Wizard)
