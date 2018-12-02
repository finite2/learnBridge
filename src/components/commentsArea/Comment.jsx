import React from 'react'

import Suits from '../../cards/Suits'

import './Comment.scss'


const Comment = (props) => {

  const {comment, className} = props
  var commentArray = formatComment(comment)

  return (
    <div className="comment-holder">
      <div className={"comment comment-" + className}>
        {commentArray.map((c,i) => <span key={i}>{c}</span>)}
      </div>
    </div>
  )

}



const formatComment = (comment) => {
  const splitString = (string, index) => [string.substring(0, index), string.substring(index, index+2), string.substring(index+2)]

  var commentArray = [comment]
  var index = 0
  var totalSeen = 0
  for (var i = 0; i < comment.length; i++) {
    if(comment[i] === "!") {
      var [first, special, last] = splitString(commentArray[index], i - totalSeen)
      if(first !== "") {
        commentArray[index] = first
        commentArray.push(specialStringToComponent(special))
        index++
      } else {
        commentArray[index] = specialStringToComponent(special)
      }
      if(last !== "") {
        commentArray.push(last)
        index++
      }
      totalSeen += first.length + 2
    }
  }
  return commentArray
}

const specialStringToComponent = (special, height=12) => {
  special = special.toLowerCase()
  if(special === "!c") {
    return <Suits.Club height={height}/>
  } else if(special === "!d") {
    return <Suits.Diamond height={height}/>
  } else if(special === "!h") {
    return <Suits.Heart height={height}/>
  } else if(special === "!s") {
    return <Suits.Spade height={height}/>
  } else {
    return "!"
  }
}

export default React.memo(Comment)
