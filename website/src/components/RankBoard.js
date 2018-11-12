import React, { Component } from "react"
import { Link } from "react-router-dom"

class RankBoard extends Component {
  constructor(props) {
    super(props)
    this.state = { challenges: false, dudes: {}, rankCount: false }
  }

  componentDidMount() {
    fetch(
      "https://raw.githubusercontent.com/nodeschool/sanmiguel/master/retos/tracking.json"
    )
      .then(r => r.json())
      .then(body =>
        this.setState(
          {
            challenges: body.challenges,
            dudes: body.id
          },
          _ => {
            let tempDudes = {}
            Object.keys(this.state.dudes).forEach(dude => (tempDudes[dude] = 0))
            this.setState({ rankCount: tempDudes })
          }
        )
      )
  }

  render() {
    return (
      <div className="RankBoard" style={{ minHeight: "100vh" }}>
        <style>{`
          body{
            padding: 2rem calc(10vw + 7rem); 
            background: #ffdd57
          } 
          table.table.has-background-warning tr>td{
            border-width: 2px !important;
            border-color: #363636 !important
          }
          table.table.has-background-warning tr>th{
            border-width: 2px !important
          }
        `}</style>
        <div className="hero is-warning">
          <div className="hero-body">
            <div className="title is-size-1">Tablero de pocisiones</div>
            <div className="subtitle">
              Es malo pocisionar a una persona o marcarla por un reto hecho en
              el <b>workshop</b>, pero de una manera u otra se debe valorar su
              esfuerzo
            </div>
          </div>
        </div>

        <style>
          {` 
        ._loader>*{
          position: relative;
          display: inline-block;
        }
        `}
        </style>
        <div className="section">
          <div className="title is-size-4">Listado de retos / Retadores</div>
          {this.state.rankCount ? (
            <Rank
              dudes={this.state.dudes}
              rankCount={this.state.rankCount}
              challenges={this.state.challenges}
            />
          ) : (
            <Loader />
          )}
        </div>

        <div className="section">
          <div className="title is-size-4">Retador / Puntaje</div>
          {this.state.rankCount ? (
            <Individual
              dudes={this.state.dudes}
              rankCount={this.state.rankCount}
            />
          ) : (
            <Loader />
          )}

          <div
            className="help label has-text-centered"
            style={{ marginTop: "2rem" }}>
            Al final cáda retador de la lista recibira un certificado por
            participación , pero el top 3 tendrá extra por su esfuerzo
          </div>
          <div
            className="field is-grouped is-grouped-right"
            style={{ marginTop: "3rem" }}>
            <div className="control">
              <Link
                className="button is-dark is-radiusless has-text-warning has-text-weight-bold"
                to="/">
                Volver
              </Link>
            </div>
            <div className="control">
              <div className="button is-dark is-radiusless has-text-warning has-text-weight-bold">
                Agregar reto
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const Loader = _ => (
  <div
    className="title is-size-1 has-text-centered _loader"
    style={{ padding: "4rem 1rem" }}>
    <span className="animated infinite tada">.</span>
    <span className="animated infinite tada">.</span>
    <span className="animated infinite tada">.</span>
  </div>
)

const Individual = props => (
  <table className="table is-fullwidth is-bordered is-marginless has-background-warning animated fadeIn">
    <thead>
      <tr>
        <th>Retador</th>
        <th>Puntaje</th>
      </tr>
    </thead>
    <tbody>
      {Object.keys(props.rankCount)
        .sort((a, b) => props.rankCount[b] - props.rankCount[a])
        .map(dude => (
          <tr key={"dude-" + dude}>
            <td>{props.dudes[dude]}</td>
            <td>{props.rankCount[dude]}</td>
          </tr>
        ))}
    </tbody>
  </table>
)

const Rank = props => (
  <table className="table is-fullwidth is-bordered is-marginless has-background-warning animated fadeIn">
    <thead>
      <tr>
        <th>Reto</th>
        <th>Retadores</th>
      </tr>
    </thead>
    <tbody>
      {Object.keys(props.challenges).map(e => (
        <tr key={e}>
          <td>{e}</td>
          <td>
            <ul>
              {props.challenges[e].split(" ").map(dude => {
                props.rankCount[dude] += 1
                return <li key={dude}>&#9642; {props.dudes[dude]}</li>
              })}
            </ul>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)

export default RankBoard
