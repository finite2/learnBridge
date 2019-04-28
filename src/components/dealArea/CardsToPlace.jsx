import React, {useMemo} from "react"

import Card from "../../classes/Card"
import CardUI from "./CardUI"

const CardsToPlace = props => {
  const {cardWidth, cardHeight, cardOverlap, callback} = props

  let cardRemaining = new Array(52).fill(true)
  let handWidth = cardOverlap * 12 + cardWidth + 4

  const cards = useMemo(() => {
    let crds = []
    for (let i = 0; i < 52; i++) {
      crds.push(Card.fromNumber(i))
    }
    return crds
  }, [])

  const cardsUI = cards.map((c, i) => {
    if (cardRemaining[i]) {
      console.log(c.value)
      let x = cardOverlap * (14 - c.value)
      let y = c.toSuitValue() * 75
      return <CardUI card={c} callback={callback} cardHeight={cardHeight} cardWidth={cardWidth} x={x} y={y} />
    } else {
      return null
    }
  })

  return (
    <g transform={`translate(${300},${200})`}>
      <rect x={0} y={0} width={handWidth + 40} height={cardHeight + 3 * 75 + 40} fill="#68cf89" />
      <g transform={`translate(${20},${20})`}>{cardsUI}</g>
    </g>
  )
}

export default CardsToPlace
