import React from 'react'


const Comment = (props) => {
  return (
    <div>
      <p>{props.comment}</p>
    </div>
  )

}

export default React.memo(Comment)
