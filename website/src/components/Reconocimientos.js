import React, { Component } from "react"
class Reconocimientos extends Component {
  render() {
    return (
      <div
        className="column is-12 is-flex"
        style={{
          background: "#f0db4f",
          minHeight: "100vh",
          alignItems: "center",
          flexDirection: "column",
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
        {this.props.match.params.man}
        </h1>
        <h1 className="title is-size-2 has-text-centered">
        {this.props.match.params.topic}
        </h1>
      </div>
    )
  }
}

export default Reconocimientos
