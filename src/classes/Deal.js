import Card from "./Card"

class Deal {
  constructor(o = {}) {
    this.type = o.type || "custom"
    this.handNumber = o.handNumber || 0
    this.hands = (o.hands && o.hands.map(h => h.map(c => Card.fromString(c)))) || [[], [], [], []]
    this.dealer = o.dealer || "s"
    this.nsvulnerable = o.nsvulnerable || false
    this.ewvulnerable = o.ewvulnerable || false
    this.results = o.results || ""
  }
}

export default Deal
