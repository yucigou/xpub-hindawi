import React from 'react'
import { get } from 'lodash'
import classnames from 'classnames'
import { ValidatedField, Button } from '@pubsweet/ui'

import classes from './WizardStep.local.scss'

export default ({
  children: stepChildren,
  title,
  buttons,
  nextStep,
  prevStep,
  handleSubmit,
  isFinal,
  isFirst,
  goBack,
  formValues,
}) => (
  <div className={classnames(classes.step)}>
    <form className={classnames(classes.form)} onSubmit={handleSubmit}>
      <h3 className={classnames(classes.title)}>{title}</h3>
      {stepChildren &&
        stepChildren.map(
          ({
            fieldId,
            validate,
            dependsOn,
            renderComponent: Comp,
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
                component={input => <Comp {...rest} {...input} />}
                key={fieldId}
                name={fieldId}
                validate={validate}
              />
            )
          },
        )}
      <div className={classnames(classes.buttons)}>
        <Button onClick={isFirst ? goBack : prevStep}>
          {isFirst ? 'Cancel' : 'Back'}
        </Button>
        <Button primary type="submit">
          {isFinal ? 'Finish' : 'Next'}
        </Button>
      </div>
    </form>
  </div>
)
