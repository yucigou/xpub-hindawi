import React from 'react'
import PropTypes from 'prop-types'
import { compose, withHandlers, setDisplayName } from 'recompose'

import classes from './Steps.local.scss'

const Separator = () => <div className={classes.separator} />

const Step = ({ title, index, currentStep }) => (
  <div className={classes.step}>
    {index === currentStep && <div className={classes.bullet} />}
    {index < currentStep && <div className={classes.success}>✓</div>}
    <span className={classes.stepTitle}>{`${index + 1}. ${title}`}</span>
  </div>
)

const Steps = ({ currentStep, children, renderSteps }) => (
  <div className={classes.container}>{renderSteps()}</div>
)

const DecoratedSteps = compose(
  setDisplayName('Steps'),
  withHandlers({
    renderSteps: ({ children, renderSeparator, currentStep }) => () => {
      const separator = renderSeparator || Separator
      return React.Children.toArray(children).reduce(
        (acc, el, index, arr) =>
          index === arr.length - 1
            ? [...acc, React.cloneElement(el, { index, currentStep })]
            : [
                ...acc,
                React.cloneElement(el, { index, currentStep }),
                React.createElement(separator, { key: `sep-${el.key}` }),
              ],
        [],
      )
    },
  }),
)(Steps)

DecoratedSteps.Step = Step

DecoratedSteps.propTypes = {
  currentStep: PropTypes.number.isRequired,
  renderSeparator: PropTypes.func,
}

export default DecoratedSteps
