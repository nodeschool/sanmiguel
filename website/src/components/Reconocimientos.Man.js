import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Font } from "@react-pdf/renderer"
import Full from "./Full"
const yaml = require("js-yaml")
const moment = require("moment")

Font.register(
  "https://cdn.staticaly.com/gh/D3Portillo/d3-assets/master/fonts/Roboto-Light.ttf",
  { family: "Roboto" }
)

Font.register(
  "https://cdn.staticaly.com/gh/D3Portillo/d3-assets/master/fonts/RobotoCondensed-Bold.ttf",
  { family: "Roboto-bold" }
)

Font.register(
  "https://cdn.staticaly.com/gh/D3Portillo/d3-assets/master/fonts/CamingoCode-Regular.ttf",
  { family: "Code" }
)

class Man extends Component {
  state = {
    curState: "Loading",
    manName: "",
    temas: [],
    jsonData: {},
    curPdf: null
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
      this.setState({
        temas,
        curState: "Found",
        manName: text.nombre,
        jsonData: text
      })
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

  generatePDF = async tema => {
    tema = tema.toLowerCase()
    let _tema = tema.replace(/ /gi, "_").trim()
    let json = await this.state.jsonData.tema[tema]
    let realName = await this.state.jsonData.nombre
    let type = json.tipo === "taller" ? "EL TALLER" : "LA CHARLA"
    let date = moment(json.fecha, "DD-MM-YYYY").format(
      "dddd D [de] MMMM [del] YYYY"
    )
    let title = json.titulo
    let url = `https://nodeschool.io/sanmiguel/#reconocimientos/${
      this.props.match.params.man
    }/${_tema}`
    let pdfName = `${this.props.match.params.man} - ${_tema}`
    this.setState(
      {
        curPdf: null
      },
      _ =>
        this.setState({
          curPdf: (
            <Full
              url={url}
              date={date}
              name={realName}
              type={type}
              tema={title}
              pdfName={pdfName}
            />
          )
        })
    )
  }

  render() {
    return (
      <State
        stage={this.state.curState}
        temas={this.state.temas}
        man={this.props.match.params.man}
        manName={this.state.manName}
        generatePDF={this.generatePDF}
        curPdf={this.state.curPdf}
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

const Found = ({ temas, man, manName, generatePDF, curPdf }) => (
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
              <div style={{ minWidth: "7rem" }}>
                <span
                  className="button is-dark is-radiusless has-text-warning has-text-weight-bold"
                  onClick={_ => generatePDF(e)}>
                  <i className="icon ion-md-download" />
                </span>
                <a
                  className="button is-dark is-radiusless has-text-warning has-text-weight-bold"
                  href={`https://nodeschool.io/sanmiguel/#reconocimientos/${man}/${e
                    .replace(/ /gi, "_")
                    .trim()
                    .toLowerCase()}`}
                  target="_blank"
                  rel="noopener noreferrer">
                  <span>Ver</span>
                  <i className="icon ion-md-open" />
                </a>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className="buttons">
      <Link
        className="button is-dark is-radiusless has-text-warning has-text-weight-bold"
        to="/reconocimientos">
        <i className="icon ion-ios-arrow-back is-size-5" />
        <span>Volver</span>
      </Link>
    </div>
    <div className="is-hidden">{curPdf}</div>
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
