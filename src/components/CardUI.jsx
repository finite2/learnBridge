import React from 'react'

import urlRoutes from '../urlRoutes'

import './CardUI.css'


const CardUI = (props) => {

  const x = props.idx * props.cardOverlap
  const style = {height: props.cardHeight}

  if(props.visible) {
    return <image href={props.card.url()} onClick={() => props.onCardClick(props.card)} style={style} x={x}/>
  } else {
    return <image style={style} src={urlRoutes.cards + 'cardback.png'}/>
  }


}

export default CardUI
