import React from 'react'
import PropTypes from 'prop-types'
import { compose, withHandlers, withContext, getContext } from 'recompose'

import classes from './Steps.local.scss'

const Separator = () => <div className={classes.separator} />

const Step = ({ title, index, currentStep }) => (
  <div className={classes.step}>
    {index === currentStep && <div className={classes.bullet} />}
    {index < currentStep && <div className={classes.success}>✓</div>}
    <span className={classes.stepTitle}>{`${index + 1}. ${title}`}</span>
  </div>
)

const Steps = ({ currentStep, children, renderSeparator, renderSteps }) => (
  <div className={classes.container}>{renderSteps()}</div>
)

const DecoratedSteps = compose(
  withHandlers({
    renderSteps: ({ children, currentStep }) => () => {
      const c = []
      React.Children.forEach(children, (child, idx) => {
        c.push(child)
        if (idx !== React.Children.count(children) - 1) {
          c.push(<Separator key={Math.random()} />)
        }
      })
      return c
    },
  }),
  withContext({ currentStep: PropTypes.number }, ({ currentStep }) => ({
    currentStep,
  })),
)(Steps)

DecoratedSteps.Step = getContext({ currentStep: PropTypes.number })(Step)

export default DecoratedSteps
