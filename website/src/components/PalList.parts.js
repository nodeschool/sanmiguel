import React from "react"
import { Link } from "react-router-dom"
export const Nav = ({ title = "", to = "/" }) => {
  return (
    <div className="w-100 flex items-start justify-center mb3 bt2">
      <Link to={to} className="button is-warning mr1">
        <i className="icon ion-ios-arrow-back f3" />
      </Link>
      <h1 className="has-text-centered has-text-left-mobile is-marginless is-size-5-mobile h-100 flex items-center flex-grow-1 justify-center">
        {title}
      </h1>
    </div>
  )
}
