import React, { Component } from "react"
import logo from "../assets/img/logo.svg"
import { Helmet } from "react-helmet"
import config from "../assets/js/particlesjs-config"
class App extends Component {
  componentDidMount() {
    window.onload = _ =>
      window.innerWidth > 768 ? window.particlesJS("particles", config) : null
    window.onresize = _ => {
      window.particlesJS("particles", config)
      if (window.innerWidth <= 769) {
        window.pJSDom[0].pJS.fn.vendors.destroypJS()
        window.pJSDom = []
      }
    }
  }
  render() {
    return (
      <div className="columns is-mobile is-multiline">
        <Helmet>
          <link
            href="https://unpkg.com/ionicons@4.2.2/dist/css/ionicons.min.css"
            rel="stylesheet"
          />
        </Helmet>
        <div
          className="column is-12-mobile is-4-tablet"
          style={{
            overflow: "auto",
            overflowX: "hidden",
            background: "#f0db4f"
          }}>
          <div className="column is-12 has-text-centered">
            <img
              src={logo}
              style={{
                maxWidth: "14.5rem",
                marginTop: "4rem",
                minWidth: "14.5rem"
              }}
              alt="logo"
            />
          </div>
          <div className="section" style={{ paddingBottom: "20rem" }}>
            <div
              className="container title is-size-1-mobile has-text-centered-mobile has-text-dark"
              style={{ fontSize: "10rem", width: "calc(100vw - 2rem)" }}>
              SAN MIGUEL
            </div>
            <p className="has-text-grey-dark">
              Somos una comunidad que se ha formado gracias a las ganas de
              querer aprender sobre las herramientas tecnológicas para el
              desarrollo Web y multiplataforma en general. Actualmente nos
              puedes encontrar en el Instituto de la Juventud (INJUVE), los
              días: sábados de <strong>09:00AM</strong> a{" "}
              <strong>12:00MD</strong>
            </p>
          </div>
        </div>
        <div
          className="column is-8-tablet is-12-mobile has-background-dark"
          style={{
            overflow: "auto",
            overflowX: "hidden",
            position: "relative"
          }}
          id="particles">
          <div
            className="title is-hidden-mobile container"
            style={{
              marginTop: "25.6rem",
              color: "#f0db4f",
              fontSize: "10rem",
              marginLeft: "calc(-33.333vw + 1.1rem)",
              width: "calc(100vw - 2rem)"
            }}>
            SAN MIGUEL
          </div>
        </div>
      </div>
    )
  }
}

export default App
