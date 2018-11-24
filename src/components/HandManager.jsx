import React from 'react'
import PropTypes from 'prop-types'

import HandLayout from './dealArea/HandLayout'

import dealRandomHand from '../utils/dealRandomHand'

const seats = ["N","E","S","W"]

class HandManager extends React.Component {

  static propTypes = {
    target: PropTypes.string,
  }

  constructor(props) {
    super(props)

    console.log(props);
    const currentState = Object.assign({}, props.hands)

    this.state = {
      deal: props.hands,
      currentState: currentState,
      auction: [],
      yourSeat: "S",
      contract: "2s",
      declarer: "W",
      playerNames: props.playerNames,
      trick: [undefined, undefined, undefined, undefined],
    }
  }

  onCardClick(card, hand) {

  }

  render() {

    const {deal, playerNames, yourSeat} = this.state

    return <HandLayout
      seat={yourSeat}
      deal={deal}
      playerNames={playerNames}
      />


  }
}

export default HandManager
