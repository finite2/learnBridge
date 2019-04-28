import React, {useMemo, useContext} from "react"

import Card from "../../classes/Card"
import CardUI from "./CardUI"
import HandContext from "../../context/HandContext"

const CardsToPlace = props => {
  const {deal, cardsRemaining, cardWidth, cardHeight, cardOverlap, callback} = props
  const handContext = useContext(HandContext)

  let handWidth = cardOverlap * 12 + cardWidth + 4

  const cards = useMemo(() => {
    let crds = []
    for (let i = 0; i < 52; i++) {
      crds.push(Card.fromNumber(i))
    }
    return crds
  }, [])

  const cardsUI = cards.map((c, i) => {
    if (cardsRemaining[i]) {
      let x = cardOverlap * c.value
      let y = c.toSuitValue() * 75
      return (
        <CardUI card={c} callback={handContext.onCardClick} cardHeight={cardHeight} cardWidth={cardWidth} x={x} y={y} />
      )
    } else {
      return null
    }
  })

  return (
    <g transform={`translate(${300},${200})`}>
      <rect x={0} y={0} width={handWidth + 40} height={cardHeight + 3 * 75 + 40} fill="#68cf89" />
      <g transform={`translate(${20},${20})`}>{cardsUI}</g>
      {cardsRemaining.reduce((a, b) => a + b) === 0 ? (
        <rect x={20} y={20} width={50} height={50} fill="#00ff00" />
      ) : null}
    </g>
  )
}

export default CardsToPlace
