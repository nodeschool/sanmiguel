import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import NotFound from "./components/NotFound"
import RankBoard from "./components/RankBoard"
import Home from "./components/Home"
import "bulma/css/bulma.min.css"
import "./assets/css/index.css"

const Routing = _ => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/rankboard" component={RankBoard} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  )
}

ReactDOM.render(<Routing />, document.getElementById("root"))
