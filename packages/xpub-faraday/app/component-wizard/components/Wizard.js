import React from 'react'
import { compose, withHandlers } from 'recompose'
import { withJournal } from 'xpub-journal'

const Wizard = ({ journal: { wizard }, renderStep }) => (
  <div>
    {wizard.map((e, i) => (
      <div key={Math.random()}>
        {e.label} - {e.title}
        {e.children && e.children.map((c, i) => renderStep(c.type))}
      </div>
    ))}
  </div>
)

export default compose(
  withHandlers({
    renderStep: props => type => {
      switch (type) {
        case 'dropdown':
          return <div>render dropdown</div>
        case 'radio':
          return <div>render radio</div>
        case 'checkbox':
          return <div>render checkbox</div>
        default:
          return null
      }
    },
  }),
  withJournal,
)(Wizard)
