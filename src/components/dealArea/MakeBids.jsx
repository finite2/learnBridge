import React, {useContext} from "react"

import Suits from "../../cards/Suits"
import HandContext from "../../context/HandContext"

const bids = [
  "1C",
  "1D",
  "1H",
  "1S",
  "1NT",
  "2C",
  "2D",
  "2H",
  "2S",
  "2NT",
  "3C",
  "3D",
  "3H",
  "3S",
  "3NT",
  "4C",
  "4D",
  "4H",
  "4S",
  "4NT",
  "5C",
  "5D",
  "5H",
  "5S",
  "5NT",
  "6C",
  "6D",
  "6H",
  "6S",
  "6NT",
  "7C",
  "7D",
  "7H",
  "7S",
  "7NT",
]

const getHighestBidIndex = (auction, bids) => {
  let minBid = -1
  let noPassAuction = auction.filter(x => x !== "P" && x !== "X" && x !== "XX")
  if (noPassAuction.length > 0) {
    return bids.findIndex(x => x === noPassAuction[noPassAuction.length - 1])
  }
  return -1
}

const getPermittedDouble = (minBid, auction) => {
  let permittedDouble = 0
  if (minBid > -1) {
    let strAuction = auction.join("")
    console.log(strAuction)
    if (["P", "X", "XX"].findIndex(x => x === auction[auction.length - 1]) === -1) {
      permittedDouble = 1
    } else if (strAuction.endsWith("XXP")) {
      permittedDouble = 0
    } else if (strAuction.endsWith("XPP")) {
      permittedDouble = 2
    } else if (strAuction.endsWith("PP")) {
      permittedDouble = 1
    } else if (strAuction.endsWith("XXX")) {
      permittedDouble = 0
    } else if (strAuction.endsWith("PXX")) {
      permittedDouble = 0
    } else if (strAuction.endsWith("X")) {
      permittedDouble = 2
    }
  }
  return permittedDouble
}

const MakeBids = props => {
  const {yourSeat, auction} = props
  const handContext = useContext(HandContext)

  let width = 65
  let height = 36

  let minBid = getHighestBidIndex(auction, bids)
  let permittedDouble = getPermittedDouble(minBid, auction)

  console.log("hi")

  const bidsUI = bids.map((b, i) => {
    let xw = width * (0.5 + (i % 5))
    let yw = height * (0.5 + Math.floor(i / 5))
    return (
      <g transform={`translate(${xw},${yw})`}>
        <rect
          x={-width / 2}
          y={-height / 2}
          width={width}
          height={height}
          fill={minBid < i ? "#9ad7f3" : "#505050"}
          stroke="grey"
          strokeWidth={2}
          onClick={() => handContext.onBid(b, yourSeat)}
        />
        <Suits.FormatBid bid={b} height={14} />
      </g>
    )
  })

  const double = (
    <g transform={`translate(${width * 1.25},${height * 7.75})`}>
      <rect
        x={-width * 1.25}
        y={-height * 0.75}
        width={width * 2.5}
        height={height * 1.5}
        stroke="grey"
        strokeWidth={2}
        fill={permittedDouble === 1 ? "red" : "#4444FF"}
        onClick={() => handContext.onBid(permittedDouble === 1 ? "X" : "XX", yourSeat)}
      />
      <Suits.FormatBid bid={permittedDouble === 1 ? "DOUBLE" : "REDOUBLE"} height={14} />
    </g>
  )

  const pass = (
    <g transform={`translate(${width * 3.75},${height * 7.75})`}>
      <rect
        x={-width * 1.25}
        y={-height * 0.75}
        width={width * 2.5}
        height={height * 1.5}
        fill="green"
        stroke="grey"
        strokeWidth={2}
        onClick={() => handContext.onBid("P", yourSeat)}
      />
      <Suits.FormatBid bid={"P"} height={14} />
    </g>
  )

  return (
    <g transform={`translate(${500},${200})`}>
      <rect width={width * 5} height={height * 8.5} fill="grey" stroke="grey" strokeWidth={8} />
      {bidsUI}
      {permittedDouble && double}
      {pass}
    </g>
  )
}

export default MakeBids
