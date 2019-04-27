import React, {useState} from "react"

import CommentsContext from "./CommentsContext"

const CommentsContextProvider = props => {
  const {children} = props
  const [comments, setComments] = useState([])
  const addComment = comment => setComments(comments.concat(comment))

  return (
    <CommentsContext.Provider
      value={{
        comments: comments,
        addComment: addComment,
      }}>
      {children}
    </CommentsContext.Provider>
  )
}

export default CommentsContextProvider
