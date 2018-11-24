import React from 'react'

import Suits from './Suits'

const CardBack = () => {
  return <svg
     width="500"
     height="726">
    <g
       transform="translate(0,-330)"
       id="layer2">
      <rect
         style="fill:#aa8800"
         ry="33.257721"
         y="330"
         x="0"
         height="726"
         width="500"/>
      <rect
         ry="26.626478"
         y="348"
         x="18"
         height="690"
         width="464"/>
    </g>
    <g transform="translate(0,-330)">
      <Suits.Club/>
      <Suits.Spade/>
      <Suits.Heart/>
      <Suits.Diamond/>
    </g>
  </svg>
}


export default CardBack
