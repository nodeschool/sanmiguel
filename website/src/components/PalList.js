import React, { useState, useEffect } from "react"
import { nameParser } from "./Home.helpers"
import { Nav, Loader, Links } from "./parts"
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
                  <Links to={`/reconocimientos/${name.split(" ").join("_")}`}>
                    {_name}
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
