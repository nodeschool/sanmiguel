import React from "react"
import ReactDOM from "react-dom"
import Home from "./components/Home"
import registerServiceWorker from "./registerServiceWorker"
import "bulma/css/bulma.min.css"
import "./assets/css/index.css"

ReactDOM.render(<Home />, document.getElementById("root"))
registerServiceWorker()
