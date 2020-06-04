import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled from 'styled-components'

import FormNavigationButtons from './form-navigation-buttons'

// Styles.
// TODO: Improve layout.
const PaneContainer = styled.div`
  min-height: 20em;
`

/**
 * This component handles the flow between screens for new OTP user accounts.
 */
class SequentialPaneDisplay extends Component {
  static propTypes = {
    onComplete: PropTypes.func.isRequired,
    paneSequence: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)

    this.state = {
      activePaneId: 'terms'
    }
  }

  _handleToNextPane = () => {
    const { onComplete, paneSequence } = this.props
    const { activePaneId } = this.state
    const nextId = paneSequence[activePaneId].nextId

    if (nextId) {
      this.setState({
        activePaneId: nextId
      })
    } else if (onComplete) {
      onComplete()
    }
  }

  _handleToPrevPane = () => {
    const { paneSequence } = this.props
    const { activePaneId } = this.state
    this.setState({
      activePaneId: paneSequence[activePaneId].prevId
    })
  }

  render () {
    const { paneSequence } = this.props
    const { activePaneId } = this.state
    const activePane = paneSequence[activePaneId]
    const { disableNext, nextId, pane: Pane, prevId, props, title } = activePane

    return (
      <>
        <h1>{title}</h1>
        <PaneContainer>
          <Pane {...props} />
        </PaneContainer>

        <FormNavigationButtons
          backButton={prevId && {
            onClick: this._handleToPrevPane,
            text: 'Back'
          }}
          okayButton={{
            disabled: disableNext,
            onClick: this._handleToNextPane,
            text: nextId ? 'Next' : 'Finish'
          }}
        />
      </>
    )
  }
}

export default SequentialPaneDisplay