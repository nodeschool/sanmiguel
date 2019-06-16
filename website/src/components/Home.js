import React from "react"
import logo from "../assets/img/logo.svg"
import config from "../assets/js/particlesjs-config"
import { stargazersMapper, nameParser } from "./Home.helpers"
import { JoiningLinks, FacebookFeed, InfoCards } from "./Home.parts"
import { ReactComponent as Bars } from "../assets/img/bars.svg"
export default class extends React.Component {
  state = {
    stargazers: {},
    stargazersRows: [],
    members: []
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

    let members = await fetch(
      "https://na9izifwg4.execute-api.us-east-1.amazonaws.com/production/api/members"
    )
    members = await members.json()
    members = members.sort(() => 0.5 - Math.random())
    this.setState(
      {
        stargazers,
        members
      },
      () => this.map(stargazers)
    )
  }

  render() {
    const { stargazersRows, members } = this.state
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
              style={{ minHeight: "15rem" }}>
              <img
                src={logo}
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
              </p>
              <FacebookFeed />
              <div className="has-text-centered hexes-container">
                <h1
                  className={`title has-text-centered is-size-2 is-size-4-touch stargazers animated`}>
                  <Loader /> STARGAZERS <Loader />
                </h1>
                <div className="hexes-grid" ref={el => (this.grid = el)}>
                  {stargazersRows}
                </div>
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
                  target="_blank">
                  <i className="icon ion-logo-facebook" title="Facebook" />
                </a>
                <a
                  href="https://twitter.com/nodeschoolsm"
                  className="button is-rounded"
                  title="Twitter"
                  rel="noopener noreferrer"
                  target="_blank">
                  <i className="icon ion-logo-twitter" />
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
                  title="Github"
                  rel="noopener noreferrer"
                  target="_blank">
                  <i className="icon ion-logo-github" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div
          className="column is-8-desktop is-9-fullhd is-12-touch has-background-dark relative particles"
          id="particles">
          <div className="z-1 __cards">
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
              <div
                style={{ color: "rgba(255,255,255,.18)" }}
                className="pa4 flex items-center justify-center w-100 f7 pb0 nb3">
                *Para estar en este listado unete a slack, y cambia la foto de
                stock.
              </div>
              <div className="members flex align-center justify-center flex-wrap ma4">
                {members.map(member => {
                  const {
                    profile: { real_name, image_192 }
                  } = member
                  return (
                    <div className="member flex items-center justify-center">
                      <img className="w2 h2" src={image_192} alt={real_name} />
                      <div className="is-hidden-mobile ml1">
                        {nameParser(real_name)}
                      </div>
                    </div>
                  )
                })}
                <div
                  className={`member flex items-center justify-center ph2 animated ${
                    members.length > 0 ? "tada" : "pulse infinite"
                  }`}>
                  <div>Total: {members.length}</div>
                </div>
              </div>
              <div className="buttons is-right is-marginless pv5 ph4">
                <a
                  href="https://github.com/nodeschool/sanmiguel/blob/master/CODE_OF_CONDUCT.md"
                  rel="noopener noreferrer"
                  className="button --resize --custom-white is-light is-outlined"
                  target="_blank">
                  <i className="icon ion-ios-hand is-size-5" />
                  <span>Codigo de conducta</span>
                </a>

                <a
                  href="/#reconocimientos"
                  rel="noopener noreferrer"
                  className="button --resize --custom-white is-light"
                  target="_blank">
                  <i className="icon ion-ios-paper is-size-5" />
                  <span>Reconocimientos</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }
}
