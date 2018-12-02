import React from 'react'
import PropTypes from 'prop-types'

import HandLayout from './dealArea/HandLayout'

import dealRandomHand from '../utils/dealRandomHand'

import HandContext from '../context/HandContext'
import CommentsContext from '../context/CommentsContext'

const seats = ["N","E","S","W"]

class HandManager extends React.Component {
  static contextType = CommentsContext

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

    this.onBid = this.onBid.bind(this)
    this.onCardClick = this.onCardClick.bind(this)
  }

  onBid(bid, hand) {
    console.log(bid, hand)
  }

  onCardClick(card, hand) {
    this.context.addComment({comment: card.toPrettyString(), className: "action"})
    console.log(card.toString(), hand)
  }

  render() {

    const {deal, playerNames, yourSeat} = this.state

    return <HandContext.Provider value={{
        onBid: this.onBid,
        onCardClick: this.onCardClick,
    }}>
      <HandLayout
        seat={yourSeat}
        deal={deal}
        playerNames={playerNames}
        />
    </HandContext.Provider>


  }
}

export default HandManager
