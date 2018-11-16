import Card from '../classes/card'


const dealHand = () => {

  var array = []
  for (var i = 0; i < 52; i++) {
    var index = Math.floor((i+1)*Math.random())
    array.splice(index, 0, i)
  }
  var hand = [
    array.slice(0,13).sort((a,b) => a-b).map(n => Card.fromNumber(n)),
    array.slice(13,26).sort((a,b) => a-b).map(n => Card.fromNumber(n)),
    array.slice(26,39).sort((a,b) => a-b).map(n => Card.fromNumber(n)),
    array.slice(39,52).sort((a,b) => a-b).map(n => Card.fromNumber(n)),
  ]

  return hand
}

export default dealHand
