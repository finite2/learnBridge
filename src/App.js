import React, {useState} from 'react';

import CommentsContext from './context/CommentsContext'

import './App.scss';

import GetHand from './components/GetHand'
import CommentsArea from './components/commentsArea/CommentsArea'

const App = (props) => {

  const [comments, setComments] = useState([])
  const addComment = (comment) => setComments(comments.concat(comment))

  // handtutorial
  return (
    <CommentsContext.Provider value={{
        comments: comments,
        addComment: addComment,
    }}>
    <div className="App">
      <div className='left'>
        <GetHand playerNames={['Parner', "Opponent", "You", "Opponent"]} target={'/static/Deals/templating/handtoplay.json'}/>
      </div>
      <div className='right'>
        <CommentsArea/>
      </div>

    </div>
  </CommentsContext.Provider>

  )
}

export default App;
