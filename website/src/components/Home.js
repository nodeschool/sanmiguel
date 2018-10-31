import React, { Component } from "react"
import logo from "../assets/img/logo.svg"
import config from "../assets/js/particlesjs-config"
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
                <a
                  className="grid-item"
                  key={`Stargazer-${rowIndex}-${i}`}
                  href={e.html_url}
                  target="_blank"
                  rel="noopener noreferrer">
                  <div
                    className="pic"
                    style={{ backgroundImage: `url(${e.avatar_url})` }}
                    title={e.login}
                  />
                </a>
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
      <div className="columns is-mobile is-multiline">
        <div
          className="column is-12-touch is-4-desktop"
          style={{
            background: "#f0db4f"
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
              style={{ fontSize: "10rem", width: "calc(100vw - 2rem)" }}>
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
              className="column is-12 has-text-centered is-hidden-mobile"
              style={{
                marginTop: "-7rem",
                marginBottom: "7rem",
                minHeight: "30rem"
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
              marginLeft: "calc(-33.333vw + 1.1rem)",
              width: "calc(100vw - 2rem)"
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
                      className="icon ion-md-trophy"
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

          <div className="column is-12 has-text-centered" style={{ zIndex: 2 }}>
            <a
              className="button is-large fb-sign is-warning"
              href="https://www.facebook.com/groups/nodeschoolsm/"
              target="_blank"
              rel="noopener noreferrer">
              <i className="icon ion-logo-facebook" />
              <span>Unirse por Facebook</span>
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default App
