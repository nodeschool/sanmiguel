import React, { Component } from "react"
import logo from "../assets/img/logo.svg"

class App extends Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh"
        }}>
        <img
          src={logo}
          alt="logo"
          style={{
            display: "block",
            maxWidth: "40rem",
            padding: "2rem"
          }}
        />
      </div>
    )
  }
}

export default App
