import React from "react"

import Suits from "./Suits"

const color = "#aa8800"

const CardBack = props => {
  return (
    <svg width={props.width} height={props.height} viewBox="0,0,500,726">
      <g transform="translate(0,-330)" id="layer2">
        <rect style={{fill: color}} ry="33.257721" y="330" x="0" height="726" width="500" />
        <rect ry="26.626478" y="348" x="18" height="690" width="464" />
      </g>
      <g transform="translate(0,323)">
        <g transform="translate(0,75)">
          <Suits.Club height={100} color={color} />
        </g>
        <g transform="translate(75,0)">
          <Suits.Spade height={100} color={color} />
        </g>
        <g transform="translate(0,-75)">
          <Suits.Heart height={100} color={color} />
        </g>
        <g transform="translate(-75,0)">
          <Suits.Diamond height={100} color={color} />
        </g>
      </g>
    </svg>
  )
}

export default CardBack
