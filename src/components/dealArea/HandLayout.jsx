import React from 'react'

import HandUI from './HandUI'

const HandLayout = (props) => {

  const {height, width, deal, seat} = props

  const gutter = 20
  const cardHeight = Math.min(props.height / 4, 200)
  const cardWidth = cardHeight * 500 / 726
  const cardOverlap = 25
  const handWidth = cardOverlap*12 + cardWidth

  const seats = ['N','E','S','W']

  const handPosition = [
    {x: width/2 - handWidth/2, y: gutter},
    {x: width - gutter - handWidth, y: height/2 - cardHeight/2},
    {x: width/2 - handWidth/2, y: height - gutter - cardHeight},
    {x: gutter, y: height/2 - cardHeight/2}
  ]

  console.log(handPosition);

  const hands = [...Array(4)].map((x,i) => {
    const index = (seat + 2 + i) % 4
    return <HandUI key={seats[index]} seat={seats[index]} cards={deal[index]} handPosition={handPosition[index]}
      cardWidth={cardWidth} cardOverlap={cardOverlap} cardHeight={cardHeight} />
  })

  return <svg style={{width: props.width, height: props.height}}>
    {hands}
  </svg>
}


HandLayout.defaultProps = {
  width: 1200,
  height: 900,
  north: [],
  east: [],
  south: [],
  west: []
}

export default HandLayout
