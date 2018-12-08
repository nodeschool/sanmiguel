import React, { Component } from "react"
import "moment/locale/es"
import svg from "../assets/img/diploma.svg"
import logo from "../assets/img/logo.svg"
const yaml = require("js-yaml")
const moment = require("moment")
moment.locale("es")
class Reconocimientos extends Component {
  state = {
    curState: "Loading",
    profile: {}
  }
  async componentDidMount() {
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

      const topic = await Object.keys(text.tema).filter(
        e => e.replace(/ /gi, "_").trim() === params.topic
      )

      if (topic.length > 0) {
        let stuff = text.tema[topic[0].split("_").join(" ")]
        let fecha = stuff.fecha
        let tema = stuff.titulo
        let tipo = stuff.tipo
        let nombre = text.nombre
        this.setState({
          profile: {
            fecha,
            tema,
            nombre,
            tipo
          },
          curState: "Found"
        })
      } else {
        this.setState({ curState: "NotFound" })
      }
    }
  }
  render() {
    return (
      <State
        stage={this.state.curState}
        data={this.state.profile}
        params={this.props.match.params}
      />
    )
  }
}
const State = ({ stage, data, params }) => {
  return {
    Found: <Found data={data} params={params} />,
    NotFound: <NotFound />,
    Loading: <Loading />
  }[stage]
}
const Found = ({ data, params }) => (
  <div
    className="column is-12 is-flex"
    style={{
      backgroundImage: `url(${svg})`,
      backgroundColor: "#efeeee",
      minHeight: "45rem",
      alignItems: "center",
      flexDirection: "column",
      justifyContent: "center",
      backgroundPosition: "center",
      backgroundSize: "cover"
    }}>
    <img
      src={logo}
      alt=""
      style={{ width: "10rem", margin: "1rem auto", display: "block" }}
    />

    <h1
      className="title is-size-1 has-text-centered"
      style={{ fontFamily: "'Roboto', sans-serif" }}>
      La Comunidad de <br />
      NodeSchool San Miguel
    </h1>
    <h1
      className="subtitle is-size-5 has-text-centered"
      style={{ fontFamily: "'Poppins', sans-serif" }}>
      OTORGA EL PRESENTE RECONOCIMIENTO A
    </h1>
    <h1
      className="title has-text-centered"
      style={{ fontFamily: "'Roboto', sans-serif", fontSize: "4rem" }}>
      {data.nombre}
    </h1>
    <h1
      className="subtitle is-size-5 has-text-centered"
      style={{ fontFamily: "'Poppins', sans-serif" }}>
      POR HABER IMPARTIDO {data.tipo.toUpperCase() === "CHARLA" ? "LA" : "EL"}{" "}
      {data.tipo.toUpperCase()}
    </h1>
    <h1
      className="title is-size-2 has-text-centered"
      style={{ fontFamily: "'Roboto', sans-serif" }}>
      {data.tema}
    </h1>
    <h1
      className="subttitle is-size-5 has-text-centered"
      style={{ fontFamily: "'Poppins', sans-serif" }}>
      El día{" "}
      {moment(data.fecha, "MM-DD-YYYY").format("dddd D [de] MMMM [del] YYYY")}{" "}
      en la ciudad de San Miguel, El Salvador
    </h1>
    <pre
      className="help"
      style={{
        marginBottom: "3rem",
        background: "rgba(255,255,255,0.4)",
        borderRadius: "4px"
      }}>
      Verificar en: https://nodeschool.io/sanmiguel/#reconocimientos/
      {params.man}/{params.topic}
    </pre>
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
    <h1 className="title is-size-1 has-text-centered">
      Lo sentimos no encontramos el reconocimiento
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
    <h1 className="title is-size-1 has-text-centered">Buscando...</h1>
  </div>
)
export default Reconocimientos
