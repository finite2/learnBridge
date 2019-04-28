import React, {useState} from "react"

import {actionStates} from "./Constants"
import Card from "../classes/Card"
import HandContext from "../context/HandContext"
import HandLayout from "./dealArea/HandLayout"
import HandLayoutProvider from "./dealArea/HandLayoutProvider"

const CustomHand = props => {
  const [deal, setDeal] = useState([[], [], [], []])
  const [cardsRemaining, setCardsRemaining] = useState(new Array(52).fill(true))
  const [activeHand, setActiveHand] = useState(0)

  const updateActiveHand = newDeal => {
    let itterations = 0
    let set = false
    while (itterations < 4 && !set) {
      if (newDeal[(activeHand + itterations) % 4].length < 13) {
        set = true
        if (itterations > 0) {
          setActiveHand((activeHand + itterations) % 4)
        }
      }
      itterations++
    }
  }

  const onCardClick = (card, hand = null) => {
    if (hand !== null) {
      let newCardsRemaining = cardsRemaining
      newCardsRemaining[card.toNumber()] = true
      let newDeal = [...deal]
      newDeal[hand].splice(newDeal[hand].findIndex(c => c.toNumber() == card.toNumber()), 1)
      setCardsRemaining(newCardsRemaining)
      updateActiveHand(newDeal)
      setDeal(newDeal)
    } else {
      let newCardsRemaining = cardsRemaining
      newCardsRemaining[card.toNumber()] = false
      let newDeal = [...deal]
      newDeal[activeHand].push(card)
      newDeal[activeHand] = Card.sortHand(newDeal[activeHand])
      setCardsRemaining(newCardsRemaining)
      updateActiveHand(newDeal)
      setDeal(newDeal)
    }
  }

  return (
    <HandContext.Provider
      value={{
        onBid: () => null,
        onCardClick: onCardClick,
        onHandClick: hand => setActiveHand(hand),
      }}>
      <HandLayoutProvider>
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
      </HandLayoutProvider>
    </HandContext.Provider>
  )
}

export default CustomHand
