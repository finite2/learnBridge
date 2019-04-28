import React from "react"

import HandLayoutContext from "./HandLayoutContext"

const HandLayoutProvider = props => {
  const {children} = props

  return (
    <HandLayoutContext.Provider
      value={{
        width: 1300,
        height: 900,
        gutter: 20,
        cardHeight: 150,
        cardWidth: 100,
        cardOverlap: 33,
        handWidth: 496,
      }}>
      {children}
    </HandLayoutContext.Provider>
  )
}

export default HandLayoutProvider
