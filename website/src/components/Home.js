import React, { Component } from "react"
import { Link } from "react-router-dom"
import logo from "../assets/img/logo.svg"
import config from "../assets/js/particlesjs-config"

class ImgLoader extends Component {
  state = {
    imageLoaded: false
  }
  async componentDidMount() {
    let img = await fetch(this.props.e.avatar_url)
    let blob = await img.blob()
    this.setState({ imageLoaded: URL.createObjectURL(blob) })
  }
  render() {
    const { e } = this.props
    return this.state.imageLoaded ? (
      <a
        className="grid-item animated fadeIn slower"
        href={e.html_url}
        target="_blank"
        rel="noopener noreferrer">
        <div
          className="pic"
          style={{ backgroundImage: `url(${this.state.imageLoaded})` }}
          title={e.login}
        />
      </a>
    ) : null
  }
}

class App extends Component {
  state = {
    stargazers: false,
    stargazersRows: []
  }
  async componentDidMount() {
    window.onload = _ =>
      setTimeout(_ => window.particlesJS("particles", config), 300)

    window.onresize = _ => {
      window.particlesJS("particles", config)
      this.stargazersMapper()
    }

    let stargazers = await fetch(
      "https://api.github.com/repos/nodeschool/sanmiguel/stargazers"
    )
    let json = await stargazers.json()
    this.setState(
      {
        stargazers: json
      },
      _ => this.stargazersMapper()
    )
  }

  stargazersMapper = _ => {
    let elementsCount = this.state.stargazers.length
    let domArr = []
    let tempArr = Object.assign([], this.state.stargazers)
    let grid = this.grid || false
    if (grid && elementsCount > 0) {
      grid.clientWidth < 120
        ? grid.classList.add("to-low")
        : grid.classList.remove("to-low")
      let i = 0
      let itemsPerRow =
        grid.clientWidth >= 120 ? Math.floor(grid.clientWidth / 58) : 1

      Object.keys(tempArr).forEach(e => (tempArr[e].custom = false))
      let switcher = 1
      //normal switcher to change lenght off elements to splice
      while (i < elementsCount) {
        let len = elementsCount
        if (elementsCount > itemsPerRow) {
          len = switcher > 0 ? itemsPerRow : itemsPerRow - 1
          switcher *= -1
        }
        domArr.push(Object.assign([], tempArr).splice(i, len))
        i += len
      }
      let firstRemainder =
        domArr.length > 1 ? domArr[domArr.length - 2].length % 2 : null
      let lastRemainder = domArr[domArr.length - 1].length % 2

      let lastTwoAreEven = firstRemainder === lastRemainder
      let lastTwoAreOdd =
        firstRemainder !== 0 && lastRemainder !== 0 && firstRemainder !== null
      let lastOneSizes1 =
        firstRemainder !== 0 &&
        domArr[domArr.length - 1].length === 1 &&
        firstRemainder != null
      domArr[domArr.length - 1][0].custom =
        lastTwoAreEven || lastTwoAreOdd || lastOneSizes1

      this.setState({
        stargazersRows: domArr.map((row, rowIndex) => {
          let hasCustomEl = domArr[rowIndex][0].custom
          let tempStyle = {}
          tempStyle[
            `padding${["Right", "Left"][Math.round(Math.random() * 1)]}`
          ] = "58px"

          return (
            <div
              className="row"
              key={rowIndex}
              style={hasCustomEl ? { ...tempStyle } : null}>
              {row.map((e, i) => (
                <ImgLoader e={e} key={`Stargazer-${rowIndex}-${i}`} />
              ))}
            </div>
          )
        })
      })
    }
  }

  iframe =
    '<iframe class="feeder- is-hidden-touch" src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fnodeschoolsm%2F&tabs=timeline&width=340&height=500&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false&appId"  style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe>'
  render() {
    return (
      <div
        className="columns is-mobile is-multiline is-gapless"
        style={{ position: "relative" }}>
        <div
          className="column is-12-touch is-4-desktop"
          style={{
            background: "#f0db4f",
            zIndex: 2
          }}>
          <div
            className="column is-12 has-text-centered"
            style={{ minHeight: "22.5rem" }}>
            <img
              src={logo}
              style={{
                maxWidth: "14.5rem",
                marginTop: "4rem",
                minWidth: "14.5rem"
              }}
              className="animated fadeInDown"
              alt="."
            />
          </div>
          <div className="section" style={{ paddingBottom: "1.75rem" }}>
            <div
              className="container title is-size-1-touch has-text-centered-touch has-text-dark animated fadeInUp fast"
              style={{
                fontSize: "10rem",
                width: "calc(100vw - 2rem)",
                cursor: "default"
              }}>
              SAN MIGUEL
            </div>
            <p
              className="has-text-grey-dark animated fadeIn slow"
              style={{ paddingBottom: "10rem" }}>
              Somos una comunidad que se ha formado gracias a las ganas de
              querer aprender sobre las herramientas tecnológicas para el
              desarrollo Web y multiplataforma en general. Actualmente nos
              puedes encontrar en el Instituto de la Juventud (
              <strong>INJUVE</strong>
              ), los días sábados de <strong>09:00AM</strong> a{" "}
              <strong>12:00MD</strong>
            </p>

            <div
              dangerouslySetInnerHTML={{
                __html: this.iframe
              }}
              className="column is-12 has-text-centered is-hidden-touch"
              style={{
                marginTop: "-7rem",
                marginBottom: "7rem",
                minHeight: "30rem",
                zIndex: 3
              }}
            />

            <div className="column has-text-centered is-12 hexes-container">
              <h1 className="title has-text-centered is-size-2 stargazers">
                <i className="icon ion-md-star is-size-2" /> STARGAZERS{" "}
                <i className="icon ion-md-star is-size-2" />
              </h1>
              <div className="hexes-grid" ref={el => (this.grid = el)}>
                {this.state.stargazers &&
                  Object.keys(this.state.stargazersRows).map(e => {
                    let j = this.state.stargazersRows
                    return j[e]
                  })}
              </div>
              <div className="bar" />
            </div>
          </div>

          <div className="column is-12 socialite">
            <svg
              style={{ width: "100%", height: "30rem" }}
              className="is-hidden-touch"
              viewBox="0 0 100 100">
              <circle
                cx="75"
                cy="80"
                r="3"
                fill="none"
                stroke="rgba(0,0,0,0.1)"
              />

              <circle
                cx="20"
                cy="2"
                r="4"
                fill="none"
                stroke="rgba(0,0,0,0.2)"
              />
              <path
                d="M 10,80 S 0,85 20,90"
                strokeLinecap="round"
                stroke="rgba(0,0,0,0.2)"
                fill="none"
              />

              <path
                d="M 95,2 S 92,50 80,40 75,37 65,65"
                strokeLinecap="round"
                stroke="rgba(0,0,0,0.1)"
                fill="none"
              />
              <path
                d="M -2,20 10,30"
                stroke="rgba(0,0,0,0.1)"
                strokeLinecap="round"
                fill="none"
              />

              <polygon
                points="60,0 50,15 70,15"
                stroke="rgba(0,0,0,0.1)"
                strokeLinecap="round"
                fill="none"
              />

              <polygon
                points="32,46 30,55 50,55"
                stroke="rgba(0,0,0,0.2)"
                strokeLinecap="round"
                fill="none"
              />

              <path
                d="M 50,102 50,85"
                stroke="rgba(0,0,0,0.1)"
                strokeLinecap="round"
                fill="none"
              />
            </svg>

            <h2 className="subtitle has-text-centered has-text-dark has-text-weight-bold">
              REDES SOCIALES
            </h2>
            <div className="is-flex">
              <a
                href="https://web.facebook.com/nodeschoolsm/"
                className="button is-rounded"
                rel="noopener noreferrer"
                target="_blank">
                <i className="icon ion-logo-facebook" title="Facebook" />
              </a>
              <a
                href="https://www.instagram.com/nodeschoolsm/"
                className="button is-rounded"
                title="Instagram"
                rel="noopener noreferrer"
                target="_blank">
                <i className="icon ion-logo-instagram" />
              </a>

              <a
                href="https://github.com/nodeschool/sanmiguel"
                className="button is-rounded"
                title="GitHub"
                rel="noopener noreferrer"
                target="_blank">
                <i className="icon ion-logo-github" />
              </a>
            </div>
          </div>
        </div>
        <div
          className="column is-8-desktop is-12-touch has-background-dark"
          style={{
            position: "relative"
          }}
          id="particles">
          <div
            className="title is-hidden-touch container animated fadeInUp fast"
            style={{
              marginTop: "25.6rem",
              color: "#f0db4f",
              fontSize: "10rem",
              marginLeft: "calc(-33.333vw + 1.75rem)",
              width: "calc(100vw - 2rem)",
              cursor: "default",
              zIndex: 2
            }}>
            SAN MIGUEL
          </div>
          <div
            className="columns is-multiline animated fadeIn slow"
            style={{
              padding: "0 2rem",
              paddingTop: "5rem",
              position: "relative",
              zIndex: 2
            }}>
            <div className="column is-6 animated fadeIn slower">
              <div className="_card">
                <div className="content">
                  <div className="has-text-centered">
                    <i
                      className="icon ion-md-contacts"
                      style={{ fontSize: "10rem", padding: "3.5rem 1rem" }}
                    />
                  </div>
                  <h1 className="subtitle has-text-centered">
                    COMPARTÍ LO QUE SABES
                  </h1>
                  <p>
                    En <b>NodeSchool</b> puedes ya sea brindar una charla o un
                    taller relacionado a cualquier tema de desarrollo, no
                    precisamente <b>Javascript</b> o algo de <b>FrontEnd</b>
                  </p>
                </div>
              </div>
            </div>
            <div className="column is-6 animated fadeIn slower">
              <div className="_card">
                <div className="content">
                  <div className="has-text-centered">
                    <i
                      className="icon ion-md-medal"
                      style={{ fontSize: "9rem", padding: "3.5rem 1rem" }}
                    />
                  </div>
                  <h1 className="subtitle has-text-centered">VUÉLVETE MEJOR</h1>
                  <p>
                    Cuando das tu opinión en algo que eres muy bueno, puedes
                    tomar de buena manera <b>escuchar</b> versiones de los demás{" "}
                    <b>miembros</b> así como dar tu punto de vista y asimismo{" "}
                    <b>discutirlas</b> entre todos
                  </p>
                </div>
              </div>
            </div>

            <div className="column is-6 animated fadeIn slower">
              <div className="_card">
                <div className="content">
                  <div className="has-text-centered">
                    <i
                      className="icon ion-ios-cash"
                      style={{ fontSize: "9rem", padding: "3.5rem 1rem" }}
                    />
                  </div>
                  <h1 className="subtitle has-text-centered">
                    NO GASTES PISTO
                  </h1>
                  <p>
                    Si te gustas aprender y quieres ir a{" "}
                    <b>Udemy, Edx, Lynda, etc.</b>, y además no cuentas con los
                    recursos para cancelar las certificaciones{" "}
                    <i>(que es lo que buscamos)</i> , acércate y practiquemos
                    entre todos, coméntanos y hagamos Bugs!
                  </p>
                </div>
              </div>
            </div>

            <div className="column is-6 animated fadeIn slower">
              <div className="_card">
                <div className="content">
                  <div className="has-text-centered">
                    <i
                      className="icon ion-md-cube"
                      style={{ fontSize: "8rem", padding: "4rem 1rem" }}
                    />
                  </div>
                  <h1 className="subtitle has-text-centered">HACE DEPLOY</h1>
                  <p>
                    Júntate y agrégate a los <b>miembros activos</b>, así
                    estarás al pendiente de las actividades que se realizan cada
                    sábado, además puedes consultar por las <b>camisetas</b>{" "}
                    disponibles. PD: FOSS {`<3`}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            className="column is-12 has-text-centered"
            style={{ zIndex: 2, paddingTop: "4rem" }}>
            <a
              className="button is-large fb-sign is-warning"
              href="https://www.facebook.com/groups/nodeschoolsm/"
              target="_blank"
              rel="noopener noreferrer">
              <i className="icon ion-logo-facebook" />
              <span>Unirse por Facebook</span>
            </a>
          </div>

          <div className="bottom-grid">
            <div
              className="subtitle has-text-centered has-text-weight-bold has-text-dark is-size-5"
              style={{ paddingTop: "2rem" }}>
              HORARIO PARA CADA SÁBADO
            </div>

            <table className="table" style={{ width: "calc(100% - 4rem)" }}>
              <thead>
                <tr>
                  <th>
                    <i className="icon ion-ios-time" />
                    Hora
                  </th>
                  <th>
                    <i className="icon ion-ios-create" />
                    Actividad
                  </th>
                  <th className="is-hidden-mobile">
                    <i className="icon ion-ios-bug" />
                    ¿Qué se hace?
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>09:00 - 09:10 AM</td>
                  <td>WarmUp</td>
                  <td className="is-hidden-mobile">
                    Se hace un estiramiento para <b>desestresarse</b> un poco
                  </td>
                </tr>

                <tr>
                  <td>09:10 - 10:20 AM</td>
                  <td>Charla Teórica</td>
                  <td className="is-hidden-mobile">
                    Se brinda la charla o taller por el miembro establecido
                    dicho sábado
                  </td>
                </tr>

                <tr>
                  <td>10:20 - 10:30 AM</td>
                  <td>Problema para practica</td>
                  <td className="is-hidden-mobile">
                    En caso existiera una practica de la charla se da un
                    problema para ser solucionado por los integrantes de
                    NodeSchool
                  </td>
                </tr>

                <tr>
                  <td>10:30 - 10:50 AM</td>
                  <td>Receso</td>
                  <td className="is-hidden-mobile">
                    Tiempo de <b>receso</b>, además puedes hablar de la{" "}
                    <b>resolución</b> del problema
                  </td>
                </tr>

                <tr>
                  <td>10:50 - 11:30 AM</td>
                  <td>Practica</td>
                  <td className="is-hidden-mobile">
                    Se reunen y forman <b>equipos</b> para <b>solucionar</b> el
                    problema antes dado
                  </td>
                </tr>

                <tr>
                  <td>11:30 - 11:55 AM</td>
                  <td>Expocisión de resolución</td>
                  <td className="is-hidden-mobile">
                    Se elige uno o varios <b>miembros</b> del equipo para{" "}
                    <b>exponer</b> la solucion encontrada
                  </td>
                </tr>

                <tr>
                  <td>11:55 - 12:00 PM</td>
                  <td>PicTime</td>
                  <td className="is-hidden-mobile">
                    Antes de terminar el <b>MeetUp</b> se toma una fotografia
                    para llevarla como vitacora
                  </td>
                </tr>
              </tbody>
            </table>

            <div
              className="buttons is-right"
              style={{ padding: "3rem 2rem 0 2rem" }}>
              <a
                href="https://github.com/nodeschool/sanmiguel/blob/master/CODE_OF_CONDUCT.md"
                rel="noopener noreferrer"
                className="button fb-sign is-warning"
                target="_blank">
                <i className="icon ion-ios-hand is-size-5" />
                <span>Codigo de conducta</span>
              </a>

              <a
                href="https://nodeschool.io/sanmiguel/#reconocimientos"
                rel="noopener noreferrer"
                className="button fb-sign is-warning"
                target="_blank">
                <i className="icon ion-ios-paper is-size-5" />
                <span>Reconocimientos</span>
              </a>

              <Link
                className="button fb-sign is-warning"
                to={{ hash: "leaderboard" }}>
                <i className="icon ion-ios-podium is-size-5" />
                <span>LeaderBoard</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
