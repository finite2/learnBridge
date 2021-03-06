import React from "react"

const Spade = props => {
  return (
    <svg x={props.x} y={props.y} height={props.height} viewBox="0 0 104 114" style={props.style}>
      <path
        id="heart"
        style={{fill: props.color}}
        d="m 22,39 c -35.436996,36.20388 -0.69902,62.46495 27.31902,45.18043 -5.29026,18.85871 -8.19954,20.34261 -11.41131,25.30905 h 30.25099 c -3.88315,-5.01512 -7.96116,-6.45034 -12.09289,-25.20171 28.60574,16.4324 58.75472,-12.22455 27.01319,-45.28777 -20.75899,-18.1581 -28.81837,-34.73567 -30.53949,-37.08962 -1.65145,1.96128 -11.38115,19.26841 -30.53951,37.08962 z"
      />
    </svg>
  )
}

const Heart = props => {
  return (
    <svg x={props.x} y={props.y} height={props.height} viewBox="0 0 101 102" style={props.style}>
      <path
        id="heart"
        style={{fill: props.color}}
        d="m 49,99 c -0.0888,-0.16003 -0.47073,-1.31697 -0.84868,-2.57103 -2.39519,-7.94775 -6.8416,-15.9957 -14.28769,-25.86064 -2.79747,-3.70623 -5.4306,-6.98814 -12.55068,-15.64316 -8.24419,-10.02142 -10.60568,-13.23177 -12.99031,-17.65974 -1.40817,-2.61481 -2.86747,-6.59343 -3.3477,-9.12715 -0.47995,-2.53224 -0.48778,-6.66932 -0.0167,-8.82352 1.91622,-8.76259 9.69971,-15.37334 19.00692,-16.14314 10.6621,-0.88185 19.73157,4.50433 24.4969,14.54819 l 1.06411,2.24283 0.80088,-1.77182 c 1.19002,-2.63271 2.33607,-4.41332 4.27047,-6.63498 4.92509,-5.65646 10.78652,-8.42727 17.84772,-8.43697 3.16296,-0.004 4.97539,0.25819 7.67066,1.11106 4.03106,1.27557 7.06553,3.26267 9.76804,6.39659 7.04283,8.16707 6.20895,19.29345 -2.46731,32.92044 -2.02392,3.17877 -5.67562,7.88201 -10.69759,13.77805 -5.78316,6.78968 -8.60887,10.24034 -11.50188,14.04564 -6.93454,9.12131 -11.59831,17.40922 -14.16363,25.16992 -0.39132,1.18383 -0.80132,2.28697 -0.9111,2.45145 -0.25491,0.38181 -0.93228,0.3866 -1.14245,0.008 z"
      />
    </svg>
  )
}

const Diamond = props => {
  return (
    <svg x={props.x} y={props.y} height={props.height} viewBox="0 0 106 125" style={props.style}>
      <path
        id="diamond"
        style={{fill: props.color}}
        d="M 53,6 C 36,26 21,44 5,63 c 16.48351,18.08828 32.22529,36.92161 45.00001,56.5 C 63,100 78,81 95,63 78,44 63,26 50,6 Z"
      />
    </svg>
  )
}

const Club = props => {
  return (
    <svg x={props.x} y={props.y} height={props.height} viewBox="0 0 106 112" style={props.style}>
      <path
        id="club"
        style={{fill: props.color}}
        d="m 44 48 c -17.25874,-8.24428 -42.64582,1.58954 -36.63926,23.77275 5.85341,21.6177 31.13193,16.87364 39.87322,3.71455 -3.64674,24.95042 -10.05125,28.83479 -13.88998,34.25115 h 40.75508 c -4.12931,-5.79235 -11.62745,-9.30073 -16.02466,-34.59307 8.80822,13.1369 35.28787,17.69105 41.05672,-3.6143 5.67487,-20.95826 -19.90555,-32.89376 -36.91594,-23.40609 16.31134,-10.95308 22.16912,-46.92612 -8.72447,-46.92612 -31.19858,0 -25.99319,36.67637 -9.49071,46.80113 z"
      />
    </svg>
  )
}

const Suit = props => {
  if (props.suit === "c") {
    return <Club {...props} color="black" />
  } else if (props.suit === "d") {
    return <Diamond {...props} color="red" />
  } else if (props.suit === "h") {
    return <Heart {...props} color="red" />
  } else if (props.suit === "s") {
    return <Spade {...props} color="black" />
  } else {
    console.warn("suit not found:", props.suit)
    return null
  }
}

const FormatBid = props => {
  const CustomText = props => (
    <text textAnchor={props.textAnchor} alignmentBaseline="middle" style={{pointerEvents: "none", fontWeight: "bold"}}>
      {props.children}
    </text>
  )

  const SetSuit = suit => (
    <React.Fragment>
      <CustomText textAnchor="end">{props.bid[0]}</CustomText>
      <Suit x={-643} y={-8} suit={props.bid[1].toLowerCase()} style={{pointerEvents: "none"}} {...props} />
    </React.Fragment>
  )
  if (props.bid === "P") {
    return <CustomText textAnchor="middle">PASS</CustomText>
  } else if (props.bid === "DOUBLE" || props.bid === "REDOUBLE") {
    return <CustomText textAnchor="middle">{props.bid}</CustomText>
  } else if (props.bid.includes("C")) {
    return SetSuit("c")
  } else if (props.bid.includes("D")) {
    return SetSuit("d")
  } else if (props.bid.includes("H")) {
    return SetSuit("h")
  } else if (props.bid.includes("S")) {
    return SetSuit("s")
  } else {
    return <CustomText textAnchor="middle">{props.bid}</CustomText>
  }
}

export default {Suit, FormatBid, Spade, Heart, Diamond, Club}
