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
  const [nsVulnerability, setNSVulnerability] = useState(false)
  const [ewVulnerability, setEWVulnerability] = useState(false)
  const [dealer, setDealer] = useState(0)

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
      let newDeal = [...deal]
      if (newDeal[activeHand].length < 13) {
        let newCardsRemaining = cardsRemaining
        newCardsRemaining[card.toNumber()] = false

        newDeal[activeHand].push(card)
        newDeal[activeHand] = Card.sortHand(newDeal[activeHand])
        setCardsRemaining(newCardsRemaining)
        updateActiveHand(newDeal)
        setDeal(newDeal)
      }
    }
  }

  const toggleVulnerability = (nsPair, currentVulnerability) => {
    console.log(nsPair, currentVulnerability)
    if (nsPair) {
      setNSVulnerability(!currentVulnerability)
    } else {
      setEWVulnerability(!currentVulnerability)
    }
  }

  const toggleDealer = () => {
    setDealer((dealer + 1) % 4)
  }

  return (
    <HandContext.Provider
      value={{
        onCardClick: onCardClick,
        onHandClick: hand => setActiveHand(hand),
        toggleVulnerability: toggleVulnerability,
        toggleDealer: toggleDealer,
        seat: 2,
        deal: deal,
        playerNames: ["North", "East", "South", "West"],
        activePlayer: activeHand,
        yourSeat: 2,
        playerAction: actionStates.CUSTOMDEAL,
        currentTrick: {leader: 0, cards: []},
        cardsRemaining: cardsRemaining,
        nsvulnerable: nsVulnerability,
        ewvulnerable: ewVulnerability,
        contract: "",
        declarer: undefined,
        dealer: dealer,
      }}>
      <HandLayoutProvider>
        <HandLayout />
      </HandLayoutProvider>
    </HandContext.Provider>
  )
}

export default CustomHand
