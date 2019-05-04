import React, {useContext} from "react"

import {seats, actionStates} from "../Constants"
import Auction from "./Auction"
import CardsToPlace from "./CardsToPlace"
import HandContext from "../../context/HandContext"
import HandLayoutContext from "./HandLayoutContext"
import HandUI from "./HandUI"
import MakeBids from "./MakeBids"
import TrickUI from "./TrickUI"
import Vulnerability from "./Vulnerability"

const HandLayout = props => {
  const {deal, seat, playerNames, activePlayer, playerAction, auction, currentTrick} = useContext(HandContext)

  const {height, width, gutter, cardHeight, cardWidth, cardOverlap, handWidth} = useContext(HandLayoutContext)

  console.log(height)

  const seatIndex = seats.findIndex(s => s === seat)

  const handPosition = [
    {x: width / 2 - handWidth / 2, y: gutter},
    {x: width - gutter - handWidth, y: height / 2 - cardHeight / 2},
    {x: width / 2 - handWidth / 2, y: height - gutter - cardHeight},
    {x: gutter, y: height / 2 - cardHeight / 2},
  ]

  const hands = [...Array(4)].map((x, i) => {
    const index = (seatIndex + 2 + i) % 4
    return (
      <HandUI
        key={seats[index]}
        seat={index}
        active={index === activePlayer}
        cards={deal[index]}
        handPosition={handPosition[index]}
        playerName={playerNames[index]}
        cardWidth={cardWidth}
        cardOverlap={cardOverlap}
        cardHeight={cardHeight}
      />
    )
  })

  return (
    <svg style={{width: width, height: height}}>
      {hands}
      <TrickUI
        trick={currentTrick}
        position={{x: width / 2, y: height / 2}}
        cardHeight={cardHeight}
        cardWidth={cardWidth}
      />
      <Vulnerability />
      {auction ? <Auction /> : null}
      {auction && seat === activePlayer && playerAction === "bid" && <MakeBids />}
      {playerAction === actionStates.CUSTOMDEAL ? (
        <CardsToPlace cardWidth={cardWidth} cardHeight={cardHeight} cardOverlap={cardOverlap} />
      ) : null}
    </svg>
  )
}

export default HandLayout
