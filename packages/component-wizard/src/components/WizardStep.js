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

const Root = styled.div`
  align-items: stretch;
  border: 1px solid var(--color-pending);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0 20px;
  width: ${({ width }) => width || '800px'};
`

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
`
const Title = styled.h3`
  align-self: center;
`

const Subtitle = styled.div`
  align-self: center;
  margin-bottom: 25px;
`

const ButtonContainer = styled.div`
  align-items: center;
  align-self: center;
  display: flex;
  justify-content: space-around;
  margin: 15px 0;
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
