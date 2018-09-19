import React, { Component } from "react"
import logo from "../assets/img/logo.svg"
import { Helmet } from "react-helmet"

class App extends Component {
  render() {
    return (
      <div className="container">
        <Helmet>
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.0.13/css/all.css"
            integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp"
            crossorigin="anonymous"
          />
        </Helmet>

        <div className="section has-text-centered" style={{ paddingBottom: 0 }}>
          <img src={logo} style={{ maxWidth: "15rem" }} alt="logo" />
        </div>
        <p
          className="subtitle is-6 has-text-centered is-marginless"
          style={{ padding: "2rem" }}>
          <strong>NodeSchool San miguel</strong> es una comunidad que se ha
          formado gracias a las ganas de querer aprender sobre las herramientas
          tecnológicas para el desarrollo Web y multiplataforma en general{" "}
          <i className="fab fa-node-js" />
          <i className="fab fa-react" /> <i className="fas fa-code-branch" />.
          Actualmente nos puedes encontrar en el Instituto de la Juventud
          (INJUVE), los días: sábados de 09:00 a 11:00 AM
        </p>

        <div className="has-background-black">
          <h1
            className="subtitle has-text-white is-5 has-text-centered"
            style={{ padding: "1rem" }}>
            Agenda para cada sábado
          </h1>
        </div>
        <div className="section  has-background-light">
          <p class="subtitle is-7 has-text-centered has-text-grey">
            Cada una de las actividades debe ser respetada, ya que cada una es
            necesaria para que la otra sea ejecutada, también tratamos que los
            miembros apliquen y estén en un ambiente agradable. ¡ Hay Cafecito
            <i class="fas fa-coffee" />!<br /> Pregunta también por tu camiseta{" "}
            <i class="fas fa-tshirt" />
          </p>
          <table
            className="table is-stripped  has-background-light is-fullwidth"
            style={{ marginTop: "3rem" }}>
            <tbody>
              <tr style={{ borderTop: "1px solid #dbdbdb" }}>
                <th>
                  <i className="fas fa-clock" /> Hora
                </th>
                <th>
                  <i className="fas fa-chalkboard-teacher" /> Actividad
                </th>
                <th className="willhide">
                  <i className="fab fa-stack-exchange" /> Resumen
                </th>
              </tr>
              <tr>
                <td>09:00 - 09:10</td>
                <td>WarmUp</td>
                <td className="willhide">
                  Se realiza un estiramiento previo donde además cada uno de
                  nosotros comparte un poco de lo que ha vivido durante la
                  semana previa al MeetUp.
                </td>
              </tr>
              <tr>
                <td>09:10 - 10:20</td>
                <td>Charla Teórica</td>
                <td className="willhide">
                  Se da una charla por el mentor asignado la cual es relacionada
                  al tema asignado para ese día.
                </td>
              </tr>
              <tr>
                <td>10:20 - 10:30</td>
                <td>Problema para Practica</td>
                <td className="willhide">
                  Luego de recibir la charla se propone un problema el cual se
                  trata que la mayoría de veces sea realizada en equipos.
                </td>
              </tr>
              <tr>
                <td>10:30 - 10:50</td>
                <td>Receso</td>
                <td className="willhide">
                  Momento para charlar con tus amigos o hablar de la practica
                  propuesta, además de disfrutar de un cafecito.
                </td>
              </tr>
              <tr>
                <td>10:50 - 11:30</td>
                <td>Practicas</td>
                <td className="willhide">
                  Al haber finalizado el receso y charlar con miembros de tu
                  equipo se pide que empiezan a plantear una o varias soluciones
                  para un problema dado.
                </td>
              </tr>
              <tr>
                <td>11:30 - 11:55</td>
                <td>Exposiciones</td>
                <td className="willhide">
                  Se selecciona a un grupo para que exponga su posible solución
                  al problema.
                </td>
              </tr>
              <tr>
                <td>11:55 - 12:00</td>
                <td>PicTime</td>
                <td className="willhide">
                  Conclusiones sobre el problema y despedida
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default App
