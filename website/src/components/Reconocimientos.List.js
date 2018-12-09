import React, { Component } from "react"
import { Link } from "react-router-dom"

class List extends Component {
  state = {
    profiles: []
  }

  async componentDidMount() {
    let data = await fetch(
      "https://api.github.com/repos/nodeschool/sanmiguel/contents/reconocimientos"
    )
    let json = await data.json()
    this.setState({
      profiles: json
        .map(e => e.name.replace(".yml", ""))
        .sort((a, b) => 0.5 - Math.random())
    })
  }

  render() {
    return this.state.profiles.length > 0 ? (
      <Profiles profiles={this.state.profiles} />
    ) : (
      <Loading />
    )
  }
}

const Profiles = ({ profiles }) => (
  <div
    className="column is-12 is-flex"
    style={{
      background: "#f0db4f",
      minHeight: "100vh",
      alignItems: "center",
      justifyContent: "flex-start",
      flexDirection: "column"
    }}>
    <style>
      {`
         table.table tr>th{
          text-align: left !important
        }
        `}
    </style>
    <h1
      className="subtitle is-size-1 has-text-centered has-text-dark"
      style={{ paddingTop: "4rem" }}>
      Lista de Talleristas/Ponentes
    </h1>
    <table className="table is-fullwidth">
      <thead>
        <tr>
          <th>Nombre/Nickname</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {profiles.map(e => (
          <tr key={e}>
            <td>
              {e
                .split(" ")
                .map(e => e[0].toUpperCase() + e.substr(1))
                .join(" ")}
            </td>
            <td className="has-text-right">
              <Link
                className="button is-dark is-radiusless has-text-warning has-text-weight-bold"
                to={"/reconocimientos/" + e.replace(/ /gi, "_").trim()}
                replace>
                <i className="icon ion-ios-paper" style={{marginRight: "0.3rem"}}/>Reconocimientos
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

const Loading = _ => (
  <div
    className="column is-12 is-flex"
    style={{
      background: "#f0db4f",
      minHeight: "100vh",
      alignItems: "center",
      justifyContent: "center"
    }}>
    <h1 className="title is-size-1 has-text-centered">Buscando...</h1>
  </div>
)
export default List
