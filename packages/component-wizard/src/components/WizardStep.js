import React from 'react'
import { get } from 'lodash'
import styled from 'styled-components'
import { ValidatedField, Button } from '@pubsweet/ui'

import AutosaveIndicator from './AutosaveIndicator'

export default ({
  children: stepChildren,
  title,
  subtitle,
  buttons,
  nextStep,
  prevStep,
  handleSubmit,
  isFinal,
  isFirst,
  history,
  formValues,
  wizard,
  dispatchFns,
  confirmation,
  toggleConfirmation,
  wizard: { confirmationModal: ConfirmationModal },
  ...rest
}) => (
  <Root width="800px">
    <FormContainer onSubmit={handleSubmit}>
      <Title>{title}</Title>
      {subtitle && (
        <Subtitle
          dangerouslySetInnerHTML={{ __html: subtitle }} // eslint-disable-line
        />
      )}
      {stepChildren &&
        stepChildren.map(
          ({
            fieldId,
            validate,
            dependsOn,
            renderComponent: Comp,
            format,
            parse,
            ...rest
          }) => {
            if (
              dependsOn &&
              get(formValues, dependsOn.field) !== dependsOn.condition
            ) {
              return null
            }
            return (
              <ValidatedField
                component={input => (
                  <Comp {...rest} {...input} {...dispatchFns} />
                )}
                format={format}
                key={fieldId}
                name={fieldId}
                parse={parse}
                validate={validate}
              />
            )
          },
        )}
      <ButtonContainer>
        <Button onClick={isFirst ? () => history.push('/') : prevStep}>
          {isFirst
            ? `${wizard.cancelText || 'Cancel'}`
            : `${wizard.backText || 'Back'}`}
        </Button>
        <Button primary type="submit">
          {isFinal
            ? `${wizard.submitText || 'Submit Manuscript'}`
            : `${wizard.nextText || 'Next'}`}
        </Button>
      </ButtonContainer>
      {confirmation && (
        <ModalContainer>
          <ConfirmationModal toggleConfirming={toggleConfirmation} />
        </ModalContainer>
      )}
    </FormContainer>
    <AutosaveIndicator />
  </Root>
)
// #region styles
const Root = styled.div`
  align-items: stretch;
  border: ${({ theme }) => theme.borderDefault};
  border-radius: ${({ theme }) => theme.borderRadius};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: ${({ width }) => width || '800px'};
  background-color: ${({ theme }) => theme.colorTextReverse};
`

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  padding: 20px 40px;
`
const Title = styled.h5`
  align-self: center;
  font-size: ${({ theme }) => theme.fontSizeHeading5};
  margin-bottom: 10px;
`

const Subtitle = styled.div`
  align-self: center;
  margin-bottom: 30px;
`

const ButtonContainer = styled.div`
  align-items: center;
  align-self: center;
  display: flex;
  justify-content: space-around;
  margin: 40px 0 20px;
  width: ${({ width }) => width || '400px'};
`

const ModalContainer = styled.div`
  align-items: center;
  background: rgba(255, 255, 255, 0.95);
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
`
// #endregion
