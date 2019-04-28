import PropTypes from "prop-types"
import React from "react"

import {actionStates} from "./Constants"
import CommentsContext from "../context/CommentsContext"
import HandContext from "../context/HandContext"
import HandLayout from "./dealArea/HandLayout"
import HandLayoutProvider from "./dealArea/HandLayoutProvider"

const seats = ["N", "E", "S", "W"]

class HandManager extends React.Component {
  static contextType = CommentsContext

  static propTypes = {
    target: PropTypes.string,
  }

  constructor(props) {
    super(props)
    let {hands, playerNames, type} = props

    console.log(props)
    var currentState = Object.assign({}, hands)

    currentState[0] = setHandVisibility(currentState[0], false)
    currentState[1] = setHandVisibility(currentState[1], false)
    currentState[3] = setHandVisibility(currentState[3], false)

    let action = actionStates.MAKEBID

    this.state = {
      deal: hands,
      playerNames: playerNames,
      auction: ["", ""],
      yourSeat: 2,
      contract: "2s",
      trumps: "s",
      declarer: 3,

      playerAction: action,
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
    var auction = this.state.auction

    let prettyBid = prettifyBid(bid)

    this.context.addComment({comment: prettyBid, className: "left"})

    //if (this.isTurn(hand) && this.state.playerAction === "bid") {
    auction.push(bid)
    let strAuction = auction.join("")
    let contract = ""
    let trumps = ""
    let declarer = -1
    if (auction.length > 3 && strAuction.endsWith("PPP")) {
      console.log("auction ended")
      let lastBid = auction[auction.length - 4]
      if (lastBid === "P") {
        contract = "P"
        console.log("Passout auction ended")
      } else if (lastBid === "X" || lastBid === "XX") {
        contract = auction.filter(x => x !== "X" && x !== "XX" && x !== "P")[0]
        declarer = auction.findIndex(x => x == contract) % 4
        contract += lastBid
        trumps = contract[1].toLowerCase()
      } else {
        contract = lastBid
        declarer = auction.findIndex(x => x == contract) % 4
        trumps = contract[1].toLowerCase()
      }
      this.setState({
        auction: auction,
        contract: contract,
        trumps: trumps,
        declarer: declarer,
        activePlayer: declarer + 1,
        trickLeader: declarer + 1,
        playerAction: actionStates.PLAYCARD,
      })
    } else {
      this.setState({
        auction: auction,
        // activePlayer: auction.length % 4,
      })
    }
    //}
    console.log(bid, hand)
  }

  isTurn(hand) {
    return (
      this.state.activePlayer === hand ||
      (this.state.declarer === hand && this.state.activePlayer === this.state.declarer + (2 % 4))
    )
  }

  isLegalCard(card, hand) {
    if (this.state.cardsPlayed.length % 4 === 0) {
      return true
    }
    const index = 4 * Math.floor(this.state.cardsPlayed.length / 4)
    console.log("index", index)
    const suit = this.state.cardsPlayed[index].suit
    if (card.suit === suit) {
      return true
    }

    const playerHand = currentState[hand]
    for (var i = 0; i < playerHand.length; i++) {
      if (playerHand[i].suit === suit) {
        return false
      }
    }
    return true
  }

  onCardClick(card, hand = null) {
    this.context.addComment({comment: "This is a great test !c!d!h!s 2!c", className: "left"})
    console.log(this.state.cardsPlayed)
    console.log(hand)
    if (this.state.playerAction === actionStates.PLAYCARD && this.isTurn(hand) && this.isLegalCard(card, hand)) {
      this.playCard(card, hand)
    }
    this.context.addComment({comment: card.toPrettyString(), className: "action"})
    console.log(card.toString(), hand)
  }

  removeCard(card, hand) {
    let deal = this.state.deal
    let thisHand = deal[hand]
    thisHand.splice(thisHand.findIndex(c => c.value === card.value), 0)
    this.setState({
      deal: deal,
    })
  }

  addCard(card) {
    let deal = this.state.deal
    let hand = this.state.activePlayer
    let thisHand = deal[hand]
    thisHand.push(card)
    this.setState({
      deal: deal,
    })
  }

  playCard(card, hand) {
    var {
      declarer,
      trumps,
      activePlayer,
      trickLeader,
      currentTrick,
      lastTrick,
      currentState,
      tricksWonDeclarer,
      cardsPlayed,
    } = this.state

    const index = currentState[hand].findIndex(c => c.toString() === card.toString())
    currentState[hand].splice(index, 1)
    card.visible = true
    cardsPlayed.push(card)
    currentTrick = currentTrickPlayed(cardsPlayed, trickLeader)

    if (cardsPlayed.length % 4 === 0) {
      const trickWinner =
        (checkWinner(trumps, cardsPlayed[cardsPlayed.length - 4].suit, cardsPlayed.slice(cardsPlayed.length - 4)) +
          trickLeader) %
        4
      if (trickWinner === declarer || trickWinner + (2 % 4) === declarer) {
        tricksWonDeclarer++
      }
      activePlayer = trickWinner
      lastTrick = currentTrick
      trickLeader = trickWinner
    } else {
      activePlayer = (activePlayer + 1) % 4
    }
    if (cardsPlayed.length === 52) {
      // hand end make extra actions.
    }

    this.setState({
      activePlayer: activePlayer,
      trickLeader: trickLeader,
      currentTrick: currentTrick,
      lastTrick: lastTrick,
      currentState: currentState,
      tricksWonDeclarer: tricksWonDeclarer,
      cardsPlayed: cardsPlayed,
    })
  }

  render() {
    const {
      playerNames,
      yourSeat,
      currentState,
      activePlayer,
      playerAction,
      auction,
      currentTrick,
      lastTrick,
    } = this.state

    return (
      <HandContext.Provider
        value={{
          onBid: this.onBid,
          onCardClick: this.onCardClick,
        }}>
        <HandLayoutProvider>
          <HandLayout
            seat={yourSeat}
            deal={currentState}
            playerNames={playerNames}
            activePlayer={activePlayer}
            yourSeat={yourSeat}
            playerAction={playerAction}
            auction={auction}
            currentTrick={currentTrick}
          />
        </HandLayoutProvider>
      </HandContext.Provider>
    )
  }
}

const checkWinner = (trump, suit, trick) => {
  if (trump === "n") {
    return checkNTWinner(suit, trick)
  } else {
    return checkTrumpWinner(trump, suit, trick)
  }
}

const checkNTWinner = (suit, trick) => {
  var maxValid = -1
  for (var i = 0; i < trick.length; i++) {
    if (trick[i].suit === suit && trick[i].value > maxValid) {
      maxValid = trick[i].value
    }
  }
  return trick.findIndex(c => c.value === maxValid)
}

const checkTrumpWinner = (trump, suit, trick) => {
  if (trump === suit) {
    return checkNTWinner(trump, trick)
  } else {
    var trumpWinner = checkNTWinner(trump, trick)
    if (trumpWinner >= 0) {
      return trumpWinner
    } else {
      return checkNTWinner(suit, trick)
    }
  }
}

const setHandVisibility = (hand, visible) => {
  hand = hand.map(c => (c.visible = visible))
  return hand
}

const currentTrickPlayed = (cardsPlayed, leader) => {
  const index = Math.floor((cardsPlayed.length - 1) / 4)
  const trick = cardsPlayed.slice(index * 4)
  return {leader: leader, cards: trick}
}

const prettifyBid = bid => {
  if (bid === "X" || bid === "P" || bid == "XX") {
    return bid
  } else if (bid[1] === "N") {
    return bid
  }
  return bid[0] + "!" + bid[1]
}

export default HandManager
