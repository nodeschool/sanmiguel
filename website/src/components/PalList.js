import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { nameParser } from "./Home.helpers"
import { Nav } from "./PalList.parts"
const url =
  "https://api.github.com/repos/nodeschool/sanmiguel/contents/reconocimientos"
export default () => {
  const [contents, setContents] = useState([])
  const fetchData = async () => {
    const req = await fetch(url)
    const data = await req.json()
    setContents(data)
  }
  useEffect(() => {
    contents.length || fetchData()
  }, [contents])
  return (
    <div className="PalList has-background-warning">
      <div className="container content">
        <div className="pa3 flex flex-column min-vh-100">
          <Nav title="Lista de talleristas/ponentes" />
          {contents.length ? (
            <div className="w-100 container-overflowed">
              {contents.map(({ name }) => {
                name = name.trim().slice(0, -4)
                const _name = nameParser(name)

                return (
                  <Link
                    to={`/reconocimientos/${name.split(" ").join("_")}`}
                    style={{ borderWidth: 2 }}
                    className="button  mt1 w-100 is-warning is-inverted is-outlined is-radiusless">
                    <div className="w-100 flex items-center justify-start">
                      <span className="flex-grow-1 has-text-left">{_name}</span>
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
