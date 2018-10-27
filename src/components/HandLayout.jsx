import React from 'react'

import HandUI from './HandUI'

const HandLayout = (props) => {

  const {height, width} = props

  const cardHeight = Math.min(props.height / 4, 200)
  const cardWidth = cardHeight * 500 / 726
  const cardOverlap = 25
  const handWidth = cardOverlap*12 + cardWidth

  return <svg style={{width: props.width, height: props.height}}>
    <HandUI seat='N' handPosition={{x: width/2 - handWidth/2, y: height/20}} cardWidth={cardWidth} cardOverlap={cardOverlap} cardHeight={cardHeight} cards={props.north}/>
    <HandUI seat='E' handPosition={{x: width*19/20 - handWidth, y: height/2 - cardHeight/2}} cardWidth={cardWidth} cardOverlap={cardOverlap} cardHeight={cardHeight} cards={props.east}/>
    <HandUI seat='S' handPosition={{x: width/2 - handWidth/2, y: height*19/20 - cardHeight}} cardWidth={cardWidth} cardOverlap={cardOverlap} cardHeight={cardHeight} cards={props.south}/>
    <HandUI seat='W' handPosition={{x: width/20, y: height/2 - cardHeight/2}} cardWidth={cardWidth} cardOverlap={cardOverlap} cardHeight={cardHeight} cards={props.west}/>
  </svg>
}


HandLayout.defaultProps = {
  width: 1200,
  height: 800,
  north: [],
  east: [],
  south: [],
  west: []
}

export default HandLayout
