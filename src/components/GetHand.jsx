import React from 'react'

import useDeal from './use/useDeal'
import HandManager from './HandManager'

const GetHand = (props) => {
  var [deal, getDeal] = useDeal(null)

  if(!deal) {
    getDeal(props.target)
    return null
  } else {
    return <HandManager playerNames={props.playerNames} {...deal}/>
  }



}

export default React.memo(GetHand)
