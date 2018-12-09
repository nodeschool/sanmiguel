import React, { Component } from "react"
import { Link } from "react-router-dom"

class LeaderBoard extends Component {
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
      <div className="LeaderBoard" style={{ minHeight: "100vh" }}>
        <style>{`
          body{
            padding: 2rem calc(10vw + 7rem); 
            background: #f0db4f
          } 
          body table.table{
            background: #f0db4f
          }
          table.table tr>td{
            border-width: 2px !important;
            border-color: #363636 !important
          }
          table.table tr>th{
            border-width: 2px !important
          }
        `}</style>
        <div className="hero">
          <div className="hero-body">
            <div className="title is-size-1 has-text-dark">
              Tablero de puntajes
            </div>
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
          <div className="title is-size-4">Retos / Retadores</div>
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

          <div className="buttons is-right" style={{ marginTop: "3rem" }}>
            <Link
              className="button is-dark is-radiusless has-text-warning has-text-weight-bold"
              to="/">
              <i className="icon ion-ios-arrow-back is-size-5" />
              <span>Volver</span>
            </Link>
            <div className="button is-dark is-radiusless has-text-warning has-text-weight-bold">
              <i className="icon ion-ios-construct is-size-5" />
              <span>Agregar reto</span>
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
  <table className="table is-fullwidth is-bordered is-marginless animated fadeIn">
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
  <table className="table is-fullwidth is-bordered is-marginless animated fadeIn">
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

export default LeaderBoard
