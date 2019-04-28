import "./HandUI.css"

import React, {useContext} from "react"

import Card from "../../classes/Card"
import CardUI from "./CardUI"
import HandContext from "../../context/HandContext"

const HandUI = props => {
  const handContext = useContext(HandContext)

  const {seat, cards, playerName, handPosition, cardHeight, cardWidth, cardOverlap, active} = props
  const bannerHeight = cardHeight / 4 + 3
  const handWidth = cardOverlap * 12 + cardWidth + 4

  const cardsUI = cards.map((c, i) => {
    var x = (6.5 - cards.length / 2 + i) * cardOverlap

    return (
      <CardUI
        key={i}
        idx={i}
        callback={card => handContext.onCardClick(card, seat)}
        x={x}
        cardHeight={cardHeight}
        cardWidth={cardWidth}
        cardOverlap={cardOverlap}
        card={c}
        visible={true}
      />
    )
  })

  // console.log(getSuits(cards));

  return (
    <g className="hand" transform={`translate(${handPosition.x},${handPosition.y})`}>
      {cardsUI}
      <g transform={`translate(-2,${(cardHeight * 3) / 4})`}>
        <rect fill={active ? "#555555" : "black"} width={handWidth} height={bannerHeight} />
        <rect
          fill="green"
          x={bannerHeight / 8}
          y={bannerHeight / 8}
          width={(bannerHeight * 3) / 4}
          height={(bannerHeight * 3) / 4}
        />
        <text fill="white" x={bannerHeight / 2} y={bannerHeight / 2} textAnchor="middle" alignmentBaseline="middle">
          {["N", "E", "S", "W"][seat]}
        </text>
        <text fill="white" x={handWidth / 2} y={bannerHeight / 2} textAnchor="middle" alignmentBaseline="middle">
          {playerName}
        </text>
      </g>
    </g>
  )
}

HandUI.defaultProps = {
  cards: [new Card(2, "d"), new Card(13, "c")],
  onCardClick: card => console.log(card.url()),
  playerName: "Missing one",
}

export default HandUI
