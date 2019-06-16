import React, { useState, useEffect } from "react"
import { withRouter } from "react-router-dom"
import { Links, Nav, Loader  } from "./parts"
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
                    <Links to={`${pathname}/${key.split(" ").join("_")}`}>
                      {tipo.toUpperCase()}: {titulo}
                    </Links>
                  )
                })}
              </div>
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </div>
    )
  }
)
