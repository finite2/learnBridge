import "./Header.scss"

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faBars} from "@fortawesome/free-solid-svg-icons"
import React, {useState} from "react"

import WindowElement from "./WindowElement"

const Header = props => {
  const [menuOpen, setMenuOpen] = useState(false)

  const onMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <div className="header">
      <div className="right" onClick={onMenu}>
        <FontAwesomeIcon icon={faBars} color="black" />
      </div>
      {menuOpen ? <WindowElement width={180} height={500} toggleHide={onMenu} /> : null}
    </div>
  )
}

export default Header
