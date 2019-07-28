import React from "react"
import { Links, Nav } from "components"

export default ({ pageContext: { payload, route } }) => {
  route = "." + route
  console.log(route)
  return (
    <div className="Pal has-background-warning">
      <div className="container content">
        <div className="pa3 flex flex-column min-vh-100">
          <Nav title={payload.nombre} to="./reconocimientos" />
          <div className="w-100 container-overflowed">
            {Object.keys(payload.tema).map(key => {
              const { titulo, tipo } = payload.tema[key]
              return (
                <Links to={route + `/${key.split(" ").join("-")}`}>
                  {tipo.toUpperCase()}: {titulo}
                </Links>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
