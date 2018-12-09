import React from "react"

const HandContext = React.createContext({
  onBid: (bid, hand) => console.log(bid, hand),
  onCardClick: (card, hand) => console.log(card.toString, hand),
})

export default HandContext
