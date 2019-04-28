import React, {useState} from "react"

import {actionStates} from "./Constants"
import Card from "../classes/Card"
import HandContext from "../context/HandContext"
import HandLayout from "./dealArea/HandLayout"

const CustomHand = props => {
  const [deal, setDeal] = useState([[], [], [], []])
  const [cardsRemaining, setCardsRemaining] = useState(new Array(52).fill(true))
  const [activeHand, setActiveHand] = useState(0)

  const onCardClick = (card, hand = null) => {
    console.log(card, hand)
    if (hand !== null) {
      let newCardsRemaining = cardsRemaining
      newCardsRemaining[card.toNumber()] = true
      let newDeal = [...deal]
      newDeal[hand].splice(newDeal[hand].findIndex(c => c.toNumber() == card.toNumber()), 1)
      setCardsRemaining(newCardsRemaining)
      setDeal(newDeal)
    } else {
      let newCardsRemaining = cardsRemaining
      newCardsRemaining[card.toNumber()] = false
      let newDeal = [...deal]
      newDeal[activeHand].push(card)
      newDeal[activeHand] = Card.sortHand(newDeal[activeHand])
      setCardsRemaining(newCardsRemaining)
      if (newDeal[activeHand].length === 13) {
        setActiveHand((activeHand + 1) % 4)
      }
      setDeal(newDeal)
    }
  }

  console.log(cardsRemaining)

  return (
    <HandContext.Provider
      value={{
        onBid: () => null,
        onCardClick: onCardClick,
      }}>
      <HandLayout
        seat={2}
        deal={deal}
        playerNames={["North", "East", "South", "West"]}
        activePlayer={activeHand}
        yourSeat={2}
        playerAction={actionStates.CUSTOMDEAL}
        auction={[]}
        currentTrick={{leader: 0, cards: []}}
        cardsRemaining={cardsRemaining}
      />
    </HandContext.Provider>
  )
}

export default CustomHand
