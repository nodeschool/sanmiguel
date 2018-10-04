import React, { Component } from "react"
import logo from "../assets/img/logo.svg"
import config from "../assets/js/particlesjs-config"
class App extends Component {
  state = {
    stargazers: false
  }
  async componentDidMount() {
    window.onload = _ =>
      setTimeout(_ => window.particlesJS("particles", config), 300)

    window.onresize = _ => window.particlesJS("particles", config)
    let stargazers = await fetch(
      "https://api.github.com/repos/nodeschool/sanmiguel/stargazers"
    )
    let json = await stargazers.json()
    this.setState(
      {
        stargazers: json
      },
      _ => console.log(this.state.stargazers)
    )
  }
  iframe =
    '<iframe class="feeder- is-hidden-touch" src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fnodeschoolsm%2F&tabs=timeline&width=340&height=500&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false&appId"  style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe>'
  render() {
    const len = this.state.stargazers.length
    return (
      <div className="columns is-mobile is-multiline">
        <div
          className="column is-12-touch is-4-desktop"
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
          <div className="section" style={{ paddingBottom: "1.75rem" }}>
            <div
              className="container title is-size-1-touch has-text-centered-touch has-text-dark"
              style={{ fontSize: "10rem", width: "calc(100vw - 2rem)" }}>
              SAN MIGUEL
            </div>
            <p className="has-text-grey-dark">
              Somos una comunidad que se ha formado gracias a las ganas de
              querer aprender sobre las herramientas tecnológicas para el
              desarrollo Web y multiplataforma en general. Actualmente nos
              puedes encontrar en el Instituto de la Juventud (
              <strong>INJUVE</strong>
              ), los días sábados de <strong>09:00AM</strong> a{" "}
              <strong>12:00MD</strong>
            </p>
            {this.iframe ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: this.iframe
                }}
                className="column is-12 has-text-centered"
                style={{ paddingTop: "3rem", marginBottom: "7rem"}}
              />
            ) : null}
           
            <div className="column has-text-centered is-12 hexes-container">
            <h1
              className="title has-text-centered is-size-2 stargazers">
              <i className="icon ion-md-star is-size-2" /> STARGAZERS{" "}
              <i className="icon ion-md-star is-size-2" />
            </h1>
              <div className="hexes">
                {this.state.stargazers
                  ? Object.keys(this.state.stargazers).map((e, index) => {
                      const isFull = (1 + index) % 3 === 0
                      return isFull || len - 2 === index ? (
                        <div className="hex-row" key={"hex-row" + index}>
                          {new Array(isFull ? 3 : 2).fill(0, 0).map((e, i) => {
                            const stargazer = this.state.stargazers[
                              isFull ? index - i : 1 + index - i
                            ]
                            return (
                              <a
                                key={
                                  "prof" + (isFull ? index - i : 1 + index - i)
                                }
                                className="hex animated fadeIn fast"
                                href={stargazer.html_url}
                                target="_blank"
                                title={stargazer.login}>
                                <svg
                                  version="1.1"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="104"
                                  height="91"
                                  viewBox="0 0 104 90.06664199358161">
                                  <defs>
                                    <pattern
                                      id={`stargazerPic${
                                        isFull ? index - i : 1 + index - i
                                      }`}
                                      width="1"
                                      height="1"
                                      viewBox="0 0 100 100"
                                      preserveAspectRatio="none"
                                      dangerouslySetInnerHTML={{
                                        __html: ` <image xlink:href='${
                                          stargazer.avatar_url
                                        }' width="100" height="100" preserveAspectRatio="none"></image>`
                                      }}
                                    />
                                  </defs>
                                  <path
                                    stroke="#000"
                                    strokeWidth="2px"
                                    fill={`url(#stargazerPic${
                                      isFull ? index - i : 1 + index - i
                                    })`}
                                    d="M0 45.033320996790806L26 0L78 0L104 45.033320996790806L78 90.06664199358161L26 90.06664199358161Z"
                                  />
                                </svg>
                              </a>
                            )
                          })}
                        </div>
                      ) : len - 1 === index && index % 3 === 0 ? (
                        <div className="hex-row" key={"hexrow" + index}>
                          <a
                            className="hex animated fadeIn fast"
                            href={this.state.stargazers[index].html_url}
                            target="_blank"
                            title={this.state.stargazers[index].login}
                            style={{ marginTop: "-8px", marginLeft: "76px" }}>
                            <svg
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              width="104"
                              height="91"
                              viewBox="0 0 104 90.06664199358161">
                              <defs>
                                <pattern
                                  id={`stargazerPic${index}`}
                                  width="1"
                                  height="1"
                                  viewBox="0 0 100 100"
                                  preserveAspectRatio="none"
                                  dangerouslySetInnerHTML={{
                                    __html: ` <image xlink:href='${
                                      this.state.stargazers[index].avatar_url
                                    }' width="100" height="100" preserveAspectRatio="none"></image>`
                                  }}
                                />
                              </defs>
                              <path
                                fill={`url(#stargazerPic${index})`}
                                stroke="#000"
                                strokeWidth="2px"
                                d="M0 45.033320996790806L26 0L78 0L104 45.033320996790806L78 90.06664199358161L26 90.06664199358161Z"
                              />
                            </svg>
                          </a>
                        </div>
                      ) : null
                    })
                  : null}
              </div>
            </div>
          </div>
        </div>
        <div
          className="column is-8-desktop is-12-touch has-background-dark"
          style={{
            overflow: "auto",
            overflowX: "hidden",
            position: "relative"
          }}
          id="particles">
          <div
            className="title is-hidden-touch container"
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
