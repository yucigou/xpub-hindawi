import React from 'react'
import PropTypes from 'prop-types'
import { th } from '@pubsweet/ui'
import styled, { css } from 'styled-components'
import { compose, withHandlers, setDisplayName } from 'recompose'

const Separator = styled.div`
  background-color: ${th('colorPrimary')};
  flex: 1;
  height: 2px;
`

const StyledStep = styled.div`
  align-items: center;
  border: ${th('borderDefault')};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  position: relative;
  height: calc(${th('subGridUnit')} * 3);
  width: calc(${th('subGridUnit')} * 3);
`

const bulletStyle = css`
  background-color: ${th('colorPrimary')};
  border-radius: 50%;
  height: calc(${th('subGridUnit')} * 2);
  width: calc(${th('subGridUnit')} * 2);
`

const Bullet = styled.div`
  ${bulletStyle};
`

const Success = styled.div`
  ${bulletStyle};
  align-items: center;
  color: ${th('colorBackground')};
  display: flex;
  font-size: ${th('fontSizeBaseSmall')};
  height: ${th('fontSizeBase')};
  justify-content: center;
  width: ${th('fontSizeBase')};
`

const StepTitle = styled.span`
  font-size: ${th('fontSizeBaseSmall')};
  line-height: ${th('fontSizeBaseSmall')};
  left: -45px;
  position: absolute;
  text-align: center;
  top: 25px;
  white-space: normal;
  width: 120px;
`

const Root = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: ${({ margin }) => margin || '20px'};
  min-width: 500px;
`

const Step = ({ title, index, currentStep }) => (
  <StyledStep>
    {index === currentStep && <Bullet />}
    {index < currentStep && <Success>✓</Success>}
    <StepTitle>{`${index + 1}. ${title}`}</StepTitle>
  </StyledStep>
)

const Steps = ({ renderSteps, margin }) => (
  <Root margin={margin}>{renderSteps()}</Root>
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
DecoratedSteps.Separator = Separator

DecoratedSteps.propTypes = {
  currentStep: PropTypes.number.isRequired,
  renderSeparator: PropTypes.func,
  margin: PropTypes.string,
}

export default DecoratedSteps
