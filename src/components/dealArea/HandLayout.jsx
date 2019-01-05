import React from "react"

import HandUI from "./HandUI"
import TrickUI from "./TrickUI"
import Auction from "./Auction"

const HandLayout = props => {
  const {height, width, deal, seat, playerNames, activePlayer, currentTrick} = props

  const gutter = 20
  const cardHeight = 150
  const cardWidth = 100
  const cardOverlap = 33
  const handWidth = cardOverlap * 12 + cardWidth

  const seats = ["N", "E", "S", "W"]
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
      <Auction />
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
