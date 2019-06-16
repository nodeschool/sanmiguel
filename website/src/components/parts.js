//Part components for all *components* folder tree
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

export const Loader = ({ children, className = "" }) => {
  return (
    <div
      className={`flex flex-grow-1 w-100 items-center justify-center ${className}`}>
      <div className="animated flipInY infinite slower f2 b ba bw2 pv1 ph3">
        {React.isValidElement(children) || typeof children === "string"
          ? children
          : "CARGANDO"}
      </div>
    </div>
  )
}

export const Links = ({ to = "", children = null }) => {
  return (
    <Link
      to={to}
      style={{ borderWidth: 2 }}
      className="button  mt1 w-100 is-warning is-inverted is-outlined is-radiusless">
      <div className="w-100 flex items-center justify-start">
        <span
          className="flex-grow-1 has-text-left"
          style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
          {children}
        </span>
        <i className="icon ion-ios-arrow-forward" />
      </div>
    </Link>
  )
}
