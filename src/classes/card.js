import urlRoutes from "../urlRoutes"

const stringValues = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"]
const suits = ["s", "h", "c", "d"]

class Card {
  constructor(value, suit, visible = true) {
    this.suit = suit
    this.value = value
    this.visible = visible
  }

  url() {
    var value = stringValues[this.value]
    return urlRoutes.cards + value + this.suit + ".png"
  }

  faceValue() {
    return stringValues[this.value]
  }

  toString() {
    return stringValues[this.value] + this.suit
  }

  toPrettyString() {
    const value = stringValues[this.value]
    return value + "!" + this.suit
  }

  toSuitValue() {
    return suits.findIndex(s => s === this.suit)
  }

  rawValue() {
    if (this.value < 4) {
      return 4 - this.value
    }
    return 0
  }

  toNumber() {
    return this.toSuitValue() * 13 + this.value
  }

  static fromNumber(number) {
    var suit = suits[Math.floor(number / 13)]
    var value = number % 13
    return new Card(value, suit)
  }

  static fromString(card) {
    const suit = suits.find(s => s === card.substring(1, 2).toLowerCase())
    const value = stringValues.findIndex(v => v === card.substring(0, 1).toUpperCase())
    return new Card(value, suit)
  }

  static sortHand(hand) {
    return hand.sort((a, b) => a.toNumber() - b.toNumber())
  }
}

export default Card
