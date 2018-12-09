import React from "react"

import CardUI from "./CardUI"

const TrickUI = props => {
  const {trick, position, cardHeight, cardWidth} = props

  const cardOffset = [
    {x: -cardWidth / 2, y: (-cardHeight * 3) / 4},
    {x: 0, y: -cardHeight / 2},
    {x: (-cardWidth * 2) / 5, y: 0},
    {x: (-cardWidth * 11) / 12, y: -cardHeight / 3},
  ]

  console.log(trick)

  const cardsUI = trick.cards.map((c, i) => {
    const index = (i + trick.leader) % 4
    console.log("TrickUI", index)
    return (
      <g key={i} transform={`translate(${cardOffset[index].x},${cardOffset[index].y})`}>
        <CardUI idx={i} seat="none" cardHeight={cardHeight} cardWidth={cardWidth} card={c} visible={true} />
      </g>
    )
  })

  // console.log(getSuits(cards));

  return (
    <g className="current-trick" transform={`translate(${position.x},${position.y})`}>
      {cardsUI}
    </g>
  )
}

export default TrickUI
