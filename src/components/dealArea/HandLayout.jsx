import React from "react"

import {seats, actionStates} from "../Constants"
import Auction from "./Auction"
import CardsToPlace from "./CardsToPlace"
import HandUI from "./HandUI"
import MakeBids from "./MakeBids"
import TrickUI from "./TrickUI"

const HandLayout = props => {
  const {height, width, deal, seat, playerNames, activePlayer, yourSeat, playerAction, auction, currentTrick} = props

  const gutter = 20
  const cardHeight = 150
  const cardWidth = 100
  const cardOverlap = 33
  const handWidth = cardOverlap * 12 + cardWidth

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
    <svg style={{width: props.width, height: props.height}}>
      {hands}
      <TrickUI
        trick={currentTrick}
        position={{x: width / 2, y: height / 2}}
        cardHeight={cardHeight}
        cardWidth={cardWidth}
      />
      <Auction auction={auction} />
      {yourSeat === activePlayer && playerAction === "bid" && <MakeBids auction={auction} />}
      {playerAction === actionStates.CUSTOMDEAL ? (
        <CardsToPlace
          cardsRemaining={props.cardsRemaining}
          deal={deal}
          cardWidth={cardWidth}
          cardHeight={cardHeight}
          cardOverlap={cardOverlap}
        />
      ) : null}
    </svg>
  )
}

HandLayout.defaultProps = {
  width: 1300,
  height: 900,
  north: [],
  east: [],
  south: [],
  west: [],
}

export default HandLayout
