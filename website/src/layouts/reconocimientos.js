import React from "react"
import { Nav, Links } from "components"
import { Metas } from "helpers"
export default ({ pageContext: { payload } }) => {
  return (
    <div className="PalList has-background-warning">
      <Metas title="NSSM | Pequeñas muestras de amor digital para todos los ponentes y talleristas de algúno de nuetros eventos." />
      <div className="container content">
        <div className="pa3 flex flex-column min-vh-100">
          <Nav
            title="Lista de talleristas/ponentes"
            to="https://nodeschool.io/sanmiguel"
          />
          <div className="w-100 container-overflowed">
            {payload.map(({ nombre, path }) => {
              return (
                <Links key={nombre} to={`/sanmiguel${path}`}>
                  {nombre}
                </Links>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
