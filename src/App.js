import React, {useState} from 'react';

import CommentsContext from './context/CommentsContext'

import './App.scss';

import HandManager from './components/HandManager'
import CommentsArea from './components/commentsArea/CommentsArea'

const App = (props) => {

  const [comments, setComments] = useState([])
  const addComment = (comment) => setComments(comments.concat(comment))


  return (
    <CommentsContext.Provider value={{
        comments: comments,
        addComment: addComment,
    }}>
    <div className="App">
      <div className='left'>
        <HandManager/>
      </div>
      <div className='right'>
        <CommentsArea/>
      </div>

    </div>
  </CommentsContext.Provider>

  )
}

export default App;
