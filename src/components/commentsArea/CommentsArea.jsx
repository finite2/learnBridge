import './CommentsArea.scss'

import React, {useContext} from 'react'

import Comment from './Comment'
import CommentsContext from '../../context/CommentsContext';


const CommentsArea = (props) => {
  const comment = useContext(CommentsContext)
  const commentUI = comment.comments.map((comment, i) => <Comment key={i} {...comment}/>)

  return <div className="comment-box">
    {commentUI}
    <button onClick={() => comment.addComment({comment: 'This is a great test !c!d!h!s 2!c', className: 'left'})}>Add comment</button>
  </div>

}

export default CommentsArea
