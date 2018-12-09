import React, { Component } from "react"
import { Link } from "react-router-dom"
const yaml = require("js-yaml")

class Man extends Component {
  state = {
    curState: "Loading",
    manName: "",
    temas: []
  }

  getMan = async _ => {
    const params = this.props.match.params
    let data = await fetch(
      `https://raw.githubusercontent.com/nodeschool/sanmiguel/master/reconocimientos/${params.man
        .split("_")
        .join("%20")}.yml`
    )
    let text = await data.text()
    if (text.match("404: Not Found")) {
      this.setState({ curState: "NotFound" })
    } else {
      text = yaml.load(text)
      const temas = await Object.keys(text.tema).map(
        e => e[0].toUpperCase() + e.substr(1)
      )
      this.setState(
        {
          temas,
          curState: "Found",
          manName: text.nombre
        },
        _ => console.log(this.state.temas)
      )
    }
  }

  componentDidMount() {
    this.getMan()
  }

  componentDidUpdate(pprops, pstate) {
    if (this.props.location !== pprops.location) {
      this.getMan()
    }
  }

  render() {
    return (
      <State
        stage={this.state.curState}
        temas={this.state.temas}
        man={this.props.match.params.man}
        manName={this.state.manName}
      />
    )
  }
}

const State = props => {
  return {
    Found: <Found {...props} />,
    Loading: <Loading />,
    NotFound: <NotFound />
  }[props.stage]
}

const Found = ({ temas, man, manName }) => (
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
      className="subtitle is-size-1  is-size-3-mobile has-text-centered has-text-dark"
      style={{ paddingTop: "4rem" }}>
      Lista de Talleres/Charlas
    </h1>
    <h1
      className="title is-size-1  is-size-2-mobile has-text-centered"
      style={{ fontFamily: "'Roboto'; san-serif" }}>
      {manName}
    </h1>
    <table className="table is-fullwidth">
      <thead>
        <tr>
          <th>Taller/Charla</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {temas.map(e => (
          <tr key={e}>
            <td>{e}</td>
            <td className="has-text-right">
              <Link
                className="button is-dark is-radiusless has-text-warning has-text-weight-bold"
                to={`/reconocimientos/${man}/${e
                  .replace(/ /gi, "_")
                  .trim()
                  .toLowerCase()}`}
                replace>
                Ver{" "}
                <i
                  className="icon ion-md-open"
                  style={{ marginLeft: "0.3rem" }}
                />
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

const NotFound = _ => (
  <div
    className="column is-12 is-flex"
    style={{
      background: "#f0db4f",
      minHeight: "100vh",
      alignItems: "center",
      justifyContent: "center"
    }}>
    <h1 className="title is-size-1 is-size-3-mobile has-text-centered">
      Tallerista/Ponente no econtrado
    </h1>
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
    <h1 className="title is-size-1 is-size-2-mobile  has-text-centered">
      Buscando...
    </h1>
  </div>
)
export default Man
