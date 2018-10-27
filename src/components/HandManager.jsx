import React from 'react'

import HandLayout from './HandLayout'

import dealRandomHand from '../utils/dealRandomHand'

class HandManager extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      deal: dealRandomHand()
    }
  }

  render() {

    const {deal} = this.state

    return <HandLayout
      north={deal.north}
      east={deal.east}
      south={deal.south}
      west={deal.west}
      />


  }
}

export default HandManager
