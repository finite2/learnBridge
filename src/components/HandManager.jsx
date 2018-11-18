import React from 'react'

import HandLayout from './dealArea/HandLayout'

import dealRandomHand from '../utils/dealRandomHand'

const seats = ["N","E","S","W"]

class HandManager extends React.Component {

  constructor(props) {
    super(props)
    const deal = dealRandomHand()
    var handState = Object.assign({}, deal)
    console.log(handState);

    this.state = {
      deal: deal,
      currentState: handState,
      auction: [],
      yourSeat: "S",
      contract: "2s",
      declarer: "W",
      playerNames: ['Parner', "Opponent", "You", "Opponent"],
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
