import "./App.scss"

import {BrowserRouter, Route, Switch} from "react-router-dom"
import {hot} from "react-hot-loader/root"
import React from "react"

import CommentsArea from "./components/commentsArea/CommentsArea"
import CommentsContextProvider from "./context/CommentsContextProvider"
import GetHand from "./components/GetHand"
import CustomHand from "./components/CustomHand"
import Header from "./components/menus/Header"
import urlRoutes from "./urlRoutes"

const App = props => {
  // handtutorial
  return (
    <BrowserRouter>
      <CommentsContextProvider>
        <div className="App">
          <Switch>
            <Route
              path={urlRoutes.new}
              render={() => (
                <>
                  <div className="left">
                    <CustomHand />
                  </div>
                  <div className="right">
                    <Header />
                    <CommentsArea />
                  </div>
                </>
              )}
            />
            <Route
              path="*"
              render={() => (
                <>
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
                </>
              )}
            />
          </Switch>
        </div>
      </CommentsContextProvider>
    </BrowserRouter>
  )
}

export default hot(App)
