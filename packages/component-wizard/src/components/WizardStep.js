import React from 'react'
import { get } from 'lodash'
import classnames from 'classnames'
import { ValidatedField, Button } from '@pubsweet/ui'

import classes from './WizardStep.local.scss'

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
}) => (
  <div className={classnames(classes.step)}>
    <form className={classnames(classes.form)} onSubmit={handleSubmit}>
      <h3 className={classnames(classes.title)}>{title}</h3>
      <p
        className={classnames(classes.subtitle)}
        dangerouslySetInnerHTML={{ __html: subtitle }}
      />
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
      <div className={classnames(classes.buttons)}>
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
      </div>
    </form>
  </div>
)
