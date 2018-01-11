import React from 'react'
import { compose, withHandlers } from 'recompose'
import classnames from 'classnames'

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
        <button
          className={classnames({
            [classes.button]: true,
            [classes.next]: btn.action === BUTTON_ACTIONS.next,
            [classes.finish]: btn.action === BUTTON_ACTIONS.finish,
            [classes.disabled]:
              disabled &&
              (btn.action !== BUTTON_ACTIONS.cancel &&
                btn.action !== BUTTON_ACTIONS.back),
          })}
          key={btn.label}
          onClick={handleOnClick(btn.action)}
        >
          {btn.label}
        </button>
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
