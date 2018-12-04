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
      playerNames: props.playerNames,
      auction: [],
      yourSeat: 2,
      contract: "2s",
      trumps: "s",
      declarer: 3,

      playerAction: "card",
      activePlayer: 2,
      trickLeader: 2,
      currentTrick: {leader: 2, cards: []},
      lastTrick: {leader: 2, cards: []},
      currentState: currentState,
      tricksWonDeclarer: 0,
      cardsPlayed: [],
    }

    this.onBid = this.onBid.bind(this)
    this.onCardClick = this.onCardClick.bind(this)
    this.isTurn = this.isTurn.bind(this)
    this.playCard = this.playCard.bind(this)
  }

  onBid(bid, hand) {
    if(this.isTurn(hand) && this.state.playerAction === "bid") {

    }
    console.log(bid, hand)
  }

  isTurn(hand) {
    return this.state.activePlayer === hand || (this.state.declarer === hand && this.state.activePlayer === this.state.declarer + 2 % 4)
  }

  isLegalCard(card, hand) {
    if(this.state.cardsPlayed.length % 4 === 0) {
      return true
    }
    const index = 4*Math.floor(this.state.cardsPlayed.length /4)
    console.log("index", index);
    const suit = this.state.cardsPlayed[index].suit
    if(card.suit === suit) {
      return true
    }

    const playerHand = currentState[hand]
    for (var i = 0; i < playerHand.length; i++) {
      if(playerHand[i].suit === suit) {
        return false
      }
    }
    return true
  }

  onCardClick(card, hand) {
    console.log(this.state.cardsPlayed);
    console.log(hand);
    if(this.state.playerAction === "card" && this.isTurn(hand) &&  this.isLegalCard(card, hand)) {
      this.playCard(card, hand)

    }
    this.context.addComment({comment: card.toPrettyString(), className: "action"})
    console.log(card.toString(), hand)
  }

  playCard(card, hand) {
    var {declarer, trumps, activePlayer, trickLeader, currentTrick, lastTrick, currentState, tricksWonDeclarer, cardsPlayed} = this.state

    const index = currentState[hand].findIndex(c => c.toString() === card.toString())
    currentState[hand].splice(index, 1)
    cardsPlayed.push(card)
    currentTrick = currentTrickPlayed(cardsPlayed, trickLeader)

    if(cardsPlayed.length % 4 === 0) {
      const trickWinner = (checkWinner(trumps, cardsPlayed[cardsPlayed.length-4].suit, cardsPlayed.slice(cardsPlayed.length - 4)) + trickLeader) % 4
      if(trickWinner === declarer || (trickWinner + 2 % 4) === declarer) {
        tricksWonDeclarer ++
      }
      activePlayer = trickWinner
      lastTrick = currentTrick
      trickLeader = trickWinner
    } else {
      activePlayer = (activePlayer + 1) % 4
    }
    if(cardsPlayed.length === 52) {
      // hand end make extra actions.
    }

    this.setState({
      activePlayer: activePlayer,
      trickLeader: trickLeader,
      currentTrick: currentTrick,
      lastTrick: lastTrick,
      currentState: currentState,
      tricksWonDeclarer: tricksWonDeclarer,
      cardsPlayed: cardsPlayed
    })
  }

  render() {

    const { playerNames, yourSeat, currentState, activePlayer, currentTrick, lastTrick} = this.state


    return <HandContext.Provider value={{
        onBid: this.onBid,
        onCardClick: this.onCardClick,
    }}>
      <HandLayout
        seat={yourSeat}
        deal={currentState}
        playerNames={playerNames}
        activePlayer={activePlayer}
        currentTrick={currentTrick}
        />
    </HandContext.Provider>


  }
}

const checkWinner = (trump, suit, trick) => {
  if(trump === "nt") {
    return checkNTWinner(suit, trick)
  } else {
    return checkTrumpWinner(trump, suit, trick)
  }
}

const checkNTWinner = (suit, trick) => {
  var maxValid = -1
  for (var i = 0; i < trick.length; i++) {
    if(trick[i].suit === suit && trick[i].value > maxValid) {
      maxValid = trick[i].value
    }
  }
  return trick.findIndex(c => c.value === maxValid)
}

const checkTrumpWinner = (trump, suit, trick) => {
  if(trump === suit) {
    return checkNTWinner(trump, trick)
  } else {
    var trumpWinner = checkNTWinner(trump, trick)
    if(trumpWinner >= 0) {
      return trumpWinner
    } else {
      return checkNTWinner(suit, trick)
    }
  }

}

const currentTrickPlayed = (cardsPlayed, leader) => {
  const index = Math.floor((cardsPlayed.length-1)/4)
  const trick = cardsPlayed.slice(index*4)
  return {leader: leader, cards: trick}
}

export default HandManager
