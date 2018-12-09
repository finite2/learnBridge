import React, {useContext} from "react"

import urlRoutes from "../../urlRoutes"
import HandContext from "../../context/HandContext"
import Suit from "../../cards/Suits"
import CardBack from "../../cards/CardBack"

import "./CardUI.scss"

const CardUI = props => {
  const handContext = useContext(HandContext)

  const {seat, card, cardHeight, cardWidth, x, y} = props

  if (card.visible) {
    return (
      <g className="card" transform={`translate(${x},${y})`} onClick={() => handContext.onCardClick(card, seat)}>
        <rect width={cardWidth} height={cardHeight} className="card__rect" />
        <text className="card__value" x={8} y={28} style={{fontSize: "26px"}}>
          {card.faceValue()}
        </text>
        <g transform={`translate(${-650 + 17},${0 + 35})`}>
          <Suit.Suit suit={card.suit} height={22} />
        </g>

        <g transform={`translate(${-650 + 17 + 33},${0 + 35 + 20})`}>
          <Suit.Suit suit={card.suit} height={48} />
        </g>
        <g transform={`rotate(180,50,75) translate(${-650 + 17},${0 + 35}) `}>
          <Suit.Suit suit={card.suit} height={22} />
        </g>
        <text className="card__value" x={8} y={28} style={{fontSize: "28px"}} transform={`rotate(180, 50, 75)`}>
          {card.faceValue()}
        </text>
      </g>
    )
  } else {
    return (
      <g className="card" transform={`translate(${x},${y})`}>
        <CardBack height={cardHeight} width={cardWidth} />
      </g>
    )
  }
}

CardUI.defaultProps = {
  x: 0,
  y: 0,
}

export default CardUI
