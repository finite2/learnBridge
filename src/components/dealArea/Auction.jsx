import React, {useContext} from "react"

import {seats} from "../Constants"
import HandContext from "../../context/HandContext"
import Suits from "../../cards/Suits"

const Auction = props => {
  const {auction} = useContext(HandContext)
  let height = 200
  let width = 80
  let rowHeight = 22

  let offset = 0

  const header = seats.map((h, i) => (
    <text
      key={i}
      x={(i + 0.5) * width}
      y={rowHeight / 2}
      alignmentBaseline="middle"
      textAnchor="middle"
      fontWeight="bolder">
      {h}
    </text>
  ))

  const bidUI = auction.map((b, i) => {
    let y = rowHeight * (1.5 + Math.floor((offset + i) / 4))
    let x = width * (0.5 + ((offset + i) % 4))

    return (
      <g key={i} transform={`translate(${x},${y})`}>
        <Suits.FormatBid bid={b} height={14} />
      </g>
    )
  })

  return (
    <g transform={`translate(${950},${20})`}>
      <rect x={0} y={0} width={width} height={height} fill="#68cf89" />
      <rect x={2 * width} y={0} width={width} height={height} fill="#68cf89" />
      <rect x={0} y={0} width={4 * width} height={height} stroke="black" fill="none" />
      <rect x={0} y={0} width={4 * width} height={rowHeight} stroke="black" fill="none" />
      {header}
      {bidUI}
    </g>
  )
}

export default Auction
