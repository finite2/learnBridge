import React from "react"

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faTimes} from "@fortawesome/free-solid-svg-icons"

import "./WindowElement.scss"

const WindowElement = props => {
  const {width, height} = props
  return (
    <div className="window-element" style={{margin: "auto", width: width, height: height}}>
      <button className="btn-close" onClick={props.toggleHide}>
        <span className="not-selectable">
          <FontAwesomeIcon icon={faTimes} />
        </span>
      </button>
      <div className="menu-content">{props.children}</div>
    </div>
  )
}

export default WindowElement
