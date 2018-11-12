import React from "react"
import ReactDOM from "react-dom"
import Routes from "./components/Routes"
import registerServiceWorker from "./registerServiceWorker"
import "bulma/css/bulma.min.css"
import "./assets/css/index.css"

ReactDOM.render(<Routes />, document.getElementById("root"))
registerServiceWorker()
