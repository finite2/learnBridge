import React from 'react'

import HandLayout from './dealArea/HandLayout'

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
      seat={2}
      deal={deal}
      />


  }
}

export default HandManager
