import React, { Component } from 'react'
import { withJournal } from 'xpub-journal'

class DummyComp extends Component {
    render() {
        console.log(this)
        return <div>Dummy page </div>
    }
}

export default withJournal(DummyComp)
