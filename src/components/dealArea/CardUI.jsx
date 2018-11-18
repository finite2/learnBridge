import React, {useContext} from 'react'

import urlRoutes from '../../urlRoutes'
import CommentsContext from '../../context/CommentsContext'

import './CardUI.css'


const CardUI = (props) => {
  const comment = useContext(CommentsContext)

  const x = props.idx * props.cardOverlap
  const style = {height: props.cardHeight}

  if(props.visible) {
    return <image href={props.card.url()} onClick={() => props.onCardClick(props.card)} style={style} x={x} onClick={() => comment.addComment({comment: props.card.value + "!" + props.card.suit, className: "action"})}/>
  } else {
    return <image style={style} src={urlRoutes.cards + 'cardback.png'}/>
  }


}

export default CardUI
