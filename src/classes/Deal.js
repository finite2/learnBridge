import Card from './Card'

class Deal {

  constructor({type, handNumber, hands, dealer='S', nsvulnerable=false, ewvulnerable=false, results=''}) {
    this.type = type
    this.handNumber = handNumber
    this.hands = hands.map(h => h.map(c => Card.fromString(c)))
    this.dealer = dealer
    this.nsvulnerable = nsvulnerable
    this.ewvulnerable = ewvulnerable
    this.results = results
    this.handNumber = handNumber
  }
}

export default Deal
