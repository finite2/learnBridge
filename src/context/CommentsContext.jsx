import React from 'react'

const CommentsContext = React.createContext({
  comments: [],
  addComment: () => null,
});

export default CommentsContext
