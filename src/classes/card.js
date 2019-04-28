import urlRoutes from "../urlRoutes"

const stringValues = ["0", "0", "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"]

class Card {
  constructor(value, suit, visible = true) {
    this.suit = suit
    this.value = value
    this.visible = visible
  }

  url() {
    var value = [0, 0, 2, 3, 4, 5, 6, 7, 8, 9, "t", "j", "q", "k", "a"][this.value]
    return urlRoutes.cards + value + this.suit + ".png"
  }

  faceValue() {
    return stringValues[this.value]
  }

  toString() {
    return stringValues[this.value] + this.suit
  }

  toPrettyString() {
    const value = ["0", "0", "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"][this.value]
    return value + "!" + this.suit
  }

  toSuitValue() {
    return ["s", "h", "c", "d"].findIndex(s => s === this.suit)
  }

  rawValue() {
    if (this.value > 10) {
      return this.value - 10
    }
    return 0
  }

  static fromNumber(number) {
    var suit = ["s", "h", "c", "d"][Math.floor(number / 13)]
    var value = 14 - (number % 13)
    return new Card(value, suit)
  }

  static fromString(card) {
    card = card.toLowerCase()
    const suit = ["s", "h", "c", "d"].find(s => s === card.substring(1, 2))
    const value =
      ["2", "3", "4", "5", "6", "7", "8", "9", "t", "j", "q", "k", "a"].findIndex(v => v === card.substring(0, 1)) + 2
    return new Card(value, suit)
  }
}

export default Card
