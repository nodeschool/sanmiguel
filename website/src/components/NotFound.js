import React, { Component } from "react"
class NotFound extends Component {
  render() {
    return (
      <div
        className="column is-12 is-flex"
        style={{
          background: "#f0db4f",
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "center"
        }}>
        <style>
          {`
            html{
              overflow: hidden
            }
            `}
        </style>
        <h1 className="title is-size-1 has-text-centered">
          404 PAGINA NO ENCONTRADA
        </h1>
      </div>
    )
  }
}

export default NotFound
