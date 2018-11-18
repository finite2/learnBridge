


const getSuits = (hand, contract="n") => {
  const suits = ['s','h','d','c']

  const groupedHand = suits.map(s => hand.filter(h => h.suit === s))

  // manage card order


  return groupedHand
}

export default getSuits
