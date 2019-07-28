import React from "react"
import { Nav, Links } from "components"
export default ({ pageContext: { payload } }) => {
  return (
    <div className="PalList has-background-warning">
      <div className="container content">
        <div className="pa3 flex flex-column min-vh-100">
          <Nav title="Lista de talleristas/ponentes" />
          <div className="w-100 container-overflowed">
            {payload.map(({ nombre, path }) => {
              return <Links to={path}>{nombre}</Links>
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
