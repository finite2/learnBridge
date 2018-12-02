import React, {useContext} from 'react'

import urlRoutes from '../../urlRoutes'
import HandContext from '../../context/HandContext'

import './CardUI.css'


const CardUI = (props) => {
  const handContext = useContext(HandContext)

  const {seat, card} = props

  const x = props.idx * props.cardOverlap
  const style = {height: props.cardHeight}

  if(props.visible) {
    return <image href={card.url()} style={style} x={x} onClick={() => handContext.onCardClick(card, seat)}/>
  } else {
    return <image style={style} src={urlRoutes.cards + 'cardback.png'}/>
  }


}

export default CardUI
