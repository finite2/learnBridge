import React, {useContext} from 'react'

import Comment from './Comment'

import CommentsContext from '../../context/CommentsContext'

import './CommentsArea.scss'

const CommentsArea = (props) => {
  const context = useContext(CommentsContext)




  const commentUI = context.comments.map((comment, i) => <Comment key={i} {...comment}/>)

  return <div className="comment-box">
    {commentUI}
    <button onClick={() => context.addComment({comment: 'This is a great test comment'})}>Add comment</button>
  </div>

}

export default CommentsArea
