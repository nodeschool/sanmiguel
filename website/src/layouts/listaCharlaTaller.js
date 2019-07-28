import React from "react"
import { Links, Nav } from "components"
import { Metas } from "helpers"
export default ({ pageContext: { payload, route } }) => {
  route = "/sanmiguel" + route
  return (
    <div className="Pal has-background-warning">
      <div className="container content">
        <Metas title="NSSM | Listado de tallerista y ponentes a lo largo de todos los eventos hosteados por Nodeschool San Miguel" />
        <div className="pa3 flex flex-column min-vh-100">
          <Nav title={payload.nombre} />
          <div className="w-100 container-overflowed">
            {Object.keys(payload.tema).map(key => {
              const { titulo, tipo } = payload.tema[key]
              return (
                <Links
                  key={`${key}-list-${payload.nombre}`}
                  to={route + `/${key.split(" ").join("-")}`}
                >
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
