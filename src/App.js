import "./App.scss"

import React from "react"
import {hot} from "react-hot-loader/root"

import CommentsArea from "./components/commentsArea/CommentsArea"
import CommentsContextProvider from "./context/CommentsContextProvider"
import GetHand from "./components/GetHand"
import Header from "./components/menus/Header"

const App = props => {
  // handtutorial
  return (
    <CommentsContextProvider>
      <div className="App">
        <div className="left">
          <GetHand
            playerNames={["Parner", "Opponent", "You", "Opponent"]}
            target={"/static/Deals/templating/handtutorial.json"}
          />
        </div>
        <div className="right">
          <Header />
          <CommentsArea />
        </div>
      </div>
    </CommentsContextProvider>
  )
}

export default hot(App)
