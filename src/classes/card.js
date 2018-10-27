
import urlRoutes from '../urlRoutes'

class Card {

  constructor(value, suit) {
    this.suit = suit
    this.value = value
  }

  url() {

    var value = [0,0,2,3,4,5,6,7,8,9,"t","j","q","k","a"][this.value]
    return urlRoutes.cards + value + this.suit + '.png'
  }

  rawValue() {
    if(this.value > 10) {
      return this.value - 10
    }
    return 0
  }

  static fromNumber(number) {
    var suit = ['s', 'h', 'c', 'd'][Math.floor(number / 13)]
    var value = 14 - (number % 13)
    return new Card(value, suit)
  }

}

export default Card
