import React from 'react'
import { compose, withHandlers } from 'recompose'
import { Button } from '@pubsweet/ui'

import classes from './ButtonGroup.local.scss'

const BUTTON_ACTIONS = {
  back: 'back',
  cancel: 'cancel',
  next: 'next',
  finish: 'finish',
}

const ButtonGroup = ({ buttons, handleOnClick, disabled }) =>
  buttons && buttons.length > 0 ? (
    <div className={classes.container}>
      {buttons.map(btn => (
        <Button
          key={btn.label}
          onClick={handleOnClick(btn.action)}
          primary={btn.action !== 'back' && btn.action !== 'cancel'}
        >
          {btn.label}
        </Button>
      ))}
    </div>
  ) : null

export default compose(
  withHandlers({
    handleOnClick: ({ onNext, onBack, onCancel, onFinish }) => btnAction => {
      switch (btnAction) {
        case BUTTON_ACTIONS.back:
          return onBack
        case BUTTON_ACTIONS.next:
          return onNext
        case BUTTON_ACTIONS.cancel:
          return onCancel
        case BUTTON_ACTIONS.finish:
          return onFinish
        default:
          return null
      }
    },
  }),
)(ButtonGroup)
