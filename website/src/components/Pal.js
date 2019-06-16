import React, { useState, useEffect } from "react"
import { withRouter, Link } from "react-router-dom"
import { Nav } from "./PalList.parts"
import { nameParser } from "./Home.helpers"
const yaml = require("js-yaml")
const url =
  "https://raw.githubusercontent.com/nodeschool/sanmiguel/master/reconocimientos/"

export default withRouter(
  ({
    match: {
      params: { pal }
    },
    location: { pathname }
  }) => {
    const [info, setInfo] = useState(false)
    const fetchData = async () => {
      const req = await fetch(url + `${pal.split("_").join("%20")}.yml`)
      const data = await req.text()
      setInfo(yaml.load(data))
    }
    useEffect(() => {
      info || fetchData()
    }, [info])
    const _pal = nameParser(pal.split("_").join(" "))
    return (
      <div className="Pal has-background-warning">
        <div className="container content">
          <div className="pa3 flex flex-column min-vh-100">
            <Nav title={info ? info.nombre : _pal} to="/reconocimientos" />
            {info ? (
              <div className="w-100 container-overflowed">
                {Object.keys(info.tema).map(key => {
                  const { titulo, tipo } = info.tema[key]
                  return (
                    <Link
                      to={`${pathname}/${key.split(" ").join("_")}`}
                      style={{ borderWidth: 2 }}
                      className="button  mt1 w-100 is-warning is-inverted is-outlined is-radiusless">
                      <div className="w-100 flex items-center justify-start">
                        <span className="flex-grow-1 has-text-left">
                          {tipo.toUpperCase()}: {titulo}
                        </span>
                        <i className="icon ion-ios-arrow-forward" />
                      </div>
                    </Link>
                  )
                })}
              </div>
            ) : (
              <div className="flex flex-grow-1 w-100 items-center justify-center">
                <div className="animated flipInY infinite slower f2 b ba bw2 pv1 ph3">
                  CARGANDO
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
)
