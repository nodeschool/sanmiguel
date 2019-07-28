import React from "react"
import config from "assets/js/particlesjs-config"
import { stargazersMapper } from "helpers/homepage"
import { Link } from "gatsby"
import {
  JoiningLinks,
  InfoCards,
  Sponsors,
  MeetUpMembers,
  PhotoAlbum
} from "components/homepage"
import Bars from "assets/img/bars.svg"
export default class extends React.Component {
  state = {
    stargazers: {},
    stargazersRows: []
  }
  map = stargazersMapper.bind(this)
  async componentDidMount() {
    window.particlesJS("particles", config)
    window.onresize = () => {
      window.particlesJS("particles", config)
      this.map(this.state.stargazers)
    }
    const _stargazers = await fetch(
      "https://api.github.com/repos/nodeschool/sanmiguel/stargazers"
    )
    const stargazers = await _stargazers.json()
    this.setState(
      {
        stargazers
      },
      () => this.map(stargazers)
    )
  }
  componentWillUnmount() {
    window.onresize = null
  }

  render() {
    const { stargazersRows } = this.state
    const Loader = () => (
      <i
        className={`icon ion-md-star ${stargazersRows.length || "is-loader"}`}
      />
    )
    return (
      <main className="Home columns is-mobile is-multiline is-gapless relative">
        <div className="column is-12-touch is-4-desktop is-3-fullhd has-background-warning z-5">
          <div className="section flex flex-column h-100">
            <div
              className="flex items-center justify-center w-100"
              style={{ minHeight: "15rem" }}
            >
              <img
                src={require("../assets/img/logo.no.svg")}
                style={{
                  width: "14.5rem"
                }}
                className="animated fadeInDown mt5"
                alt="logo"
              />
            </div>
            <div className="pa2 pb5 flex-grow-1 flex-column">
              <div className="animated fadeIn faster banner title is-size-1-touch has-text-centered-touch has-text-dark">
                SAN MIGUEL
              </div>
              <p className="has-text-grey-dark has-text-justified animated fadeIn slow pb5">
                Somos una comunidad que se enfoca en compartir conocimiento de
                manera <b>gratuita y colectiva</b> a personas en El Salvador,
                especialmente en la zona Oriental y por ello titularnos como{" "}
                <b>
                  “La primera comunidad en Oriente dedicada al desarrollo y la
                  tecnología”
                </b>
                , si es cierto que en el país hay muchas comunidades similares,
                pero en el área Oriental nunca se ha conocido alguna, es
                probable que existan otras comunidades pero no de forma pública,
                por el motivo que son desarrolladas por estudiantes y nunca
                salen de los muros de sus centros de estudio.
                <br /> <br />
                La mayoría de los miembros son estudiantes universitarios de
                distintas instituciones de San Miguel, <b>rompiendo</b> así el
                esquema de estar divididos y logrando convivencia entre miembros
                aunque estos sean de distintas instituciones.
                <br />
                <br />
                PD: Sabemos que el sitio está feo :'c, ponte en contacto con
                nosotros si deseas colaborar a dejarlo más bonito.
              </p>
              <div className="has-text-centered hexes-container">
                <h1
                  className={`title has-text-centered is-size-2 is-size-4-touch stargazers animated`}
                >
                  <Loader /> STARGAZERS <Loader />
                </h1>
                <div className="hexes-grid" ref={el => (this.grid = el)}>
                  {stargazersRows}
                </div>
              </div>
              <div className="has-text-centered hexes-container">
                <h1
                  className={`title mt4 has-text-centered is-size-2 is-size-4-touch stargazers animated`}
                >
                  SPONSORS
                </h1>
                <Sponsors />
              </div>
            </div>
            <div className="socials">
              <h2 className="subtitle  has-text-centered has-text-dark has-text-weight-bold">
                REDES SOCIALES
              </h2>
              <div className="flex items-center justify-center">
                <a
                  href="https://web.facebook.com/nodeschoolsm/"
                  className="button is-rounded"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <i className="icon ion-logo-facebook" title="Facebook" />
                </a>
                <a
                  href="https://twitter.com/nodeschoolsm"
                  className="button is-rounded"
                  title="Twitter"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <i className="icon ion-logo-twitter" />
                </a>
                <a
                  href="https://www.instagram.com/nodeschoolsm/"
                  className="button is-rounded"
                  title="Instagram"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <i className="icon ion-logo-instagram" />
                </a>

                <a
                  href="https://github.com/nodeschool/sanmiguel"
                  className="button is-rounded"
                  title="Github"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <i className="icon ion-logo-github" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div
          className="column is-8-desktop is-9-fullhd is-12-touch has-background-dark relative particles"
          id="particles"
        >
          <div className="z-1 __cards">
            <div className="flex items-center justify-end ph4 pt4 NAV flex-wrap">
              <a
                href="https://github.com/nodeschool/sanmiguel/blob/master/CODE_OF_CONDUCT.md"
                rel="noopener noreferrer"
                className="button --resize is-warning is-outlined is-radiusless"
                target="_blank"
              >
                <i className="icon ion-ios-hand is-size-5" />
                <span>Codigo de conducta</span>
              </a>

              <Link
                to="./reconocimientos"
                rel="noopener noreferrer"
                className="button --resize is-warning is-radiusless"
                target="_blank"
              >
                <i className="icon ion-ios-paper is-size-5" />
                <span>Reconocimientos</span>
              </Link>
            </div>

            <InfoCards />
            <JoiningLinks />
            <div className="members-container">
              <Bars
                style={{ width: "60%", minWidth: "20rem" }}
                className="mt6 is-block center"
              />
              <div className="glitch-wrapper mt4 is-size-1 subtitle pt5 pb0 has-text-centered has-text-weight-bold has-text-light">
                <div data-text="MIEMBROS" className="glitch">
                  MIEMBROS
                </div>
              </div>
              <MeetUpMembers />
              <PhotoAlbum />
            </div>
          </div>
        </div>
      </main>
    )
  }
}
