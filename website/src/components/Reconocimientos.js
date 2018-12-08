import React, { Component } from "react"
import "moment/locale/es"
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
        let date = text.tema[topic[0].split("_").join(" ")].fecha
        this.setState({
          profile: {
            fecha: date,
            tema: topic[0],
            nombre: params.man
              .split("_")
              .map(e => e[0].toUpperCase() + e.substr(1))
              .join(" ")
          },
          curState: "Found"
        })
      } else {
        this.setState({ curState: "NotFound" })
      }
    }
  }
  render() {
    return <State stage={this.state.curState} data={this.state.profile} />
  }
}
const State = ({ stage, data }) => {
  return {
    Found: <Found data={data} />,
    NotFound: <NotFound />,
    Loading: <Loading />
  }[stage]
}
const Found = ({ data }) => (
  <div
    className="column is-12 is-flex"
    style={{
      background: "#f0db4f",
      minHeight: "100vh",
      alignItems: "center",
      flexDirection: "column",
      justifyContent: "center"
    }}>
    <h1 className="title is-size-1 has-text-centered">{data.nombre}</h1>
    <h1 className="title is-size-2 has-text-centered">{data.tema}</h1>
    <h1 className="title is-size-3 has-text-centered">
      {moment(data.fecha, "MM-DD-YYYY").format("dddd D [de] MMMM [del] YYYY")}
    </h1>
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
