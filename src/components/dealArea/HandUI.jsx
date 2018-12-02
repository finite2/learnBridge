import React from 'react'

import CardUI from './CardUI'
import Card from '../../classes/Card'

import getSuits from '../../utils/getSuits'

import './HandUI.css'

const HandUI = (props) => {

  const {seat, cards, playerName, handPosition, cardHeight, cardWidth, cardOverlap, active} = props
  const bannerHeight = cardHeight/4
  const handWidth = cardOverlap*12 + cardWidth

  const cardsUI = cards.map((c,i) => <CardUI key={i} idx={i} seat={seat} cardHeight={cardHeight} cardOverlap={cardOverlap} card={c} visible={true}/>)

  // console.log(getSuits(cards));

  return <g className="hand" transform={`translate(${handPosition.x},${handPosition.y})`}>
    {cardsUI}
    <g transform={`translate(0,${cardHeight*3/4})`}>
      <rect fill={active? "#555555":"black"} width={handWidth} height={bannerHeight}/>
      <rect fill='green' x={bannerHeight/8} y={bannerHeight/8} width={bannerHeight*3/4} height={bannerHeight*3/4}/>
      <text fill='white' x={bannerHeight/2} y={bannerHeight/2} textAnchor='middle' alignmentBaseline='middle'>{['N','E','S','W'][seat]}</text>
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
