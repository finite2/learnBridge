import React from 'react'

import CardUI from './CardUI'
import Card from '../../classes/card'

import './HandUI.css'

const HandUI = (props) => {

  const {seat, playerName, handPosition, cardHeight, cardWidth, cardOverlap} = props
  const bannerHeight = cardHeight/4
  const handWidth = cardOverlap*12 + cardWidth

  const cards = props.cards.map((c,i) => <CardUI key={i} idx={i}  cardHeight={cardHeight} cardOverlap={cardOverlap} card={c} visible={true} onCardClick={props.onCardClick}/>)

  return <g className="hand" transform={`translate(${handPosition.x},${handPosition.y})`}>
    {cards}
    <g transform={`translate(0,${cardHeight*3/4})`}>
      <rect width={handWidth} height={bannerHeight}/>
      <rect fill='green' x={bannerHeight/8} y={bannerHeight/8} width={bannerHeight*3/4} height={bannerHeight*3/4}/>
      <text fill='white' x={bannerHeight/2} y={bannerHeight/2} textAnchor='middle' alignmentBaseline='middle'>{seat}</text>
      <text fill='white' x={handWidth/2} y={bannerHeight/2} textAnchor='middle' alignmentBaseline='middle'>{playerName}</text>
    </g>
  </g>
}


HandUI.defaultProps = {
  cards: [new Card(2,"d"), new Card(13,"c")],
  onCardClick: (card) => console.log(card.url()),
  playerName: 'Missing one'
}

export default HandUI
