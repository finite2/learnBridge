import React from "react"

const HandLayoutContext = React.createContext({
  width: 1300,
  height: 900,
  gutter: 20,
  cardHeight: 150,
  cardWidth: 100,
  cardOverlap: 33,
  handWidth: 496,
})

export default HandLayoutContext
