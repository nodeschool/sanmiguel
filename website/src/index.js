import React from "react"
import ReactDOM from "react-dom"
import { HashRouter as Router, Route, Switch } from "react-router-dom"
import NotFound from "./components/NotFound"
import LeaderBoard from "./components/LeaderBoard"
import Reconocimientos from "./components/Reconocimientos"
import Home from "./components/Home"
import Man from "./components/Reconocimientos.Man"
import List from "./components/Reconocimientos.List"
import "bulma/css/bulma.min.css"
import "./assets/css/index.css"

const Routing = _ => {
  return (
    <Router basename="/" hashType="noslash">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/leaderboard" component={LeaderBoard} />
        <Route
          path="/reconocimientos/:man/:topic"
          component={Reconocimientos}
        />
        <Route path="/reconocimientos/:man" component={Man} />
        <Route path="/reconocimientos" component={List} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  )
}

ReactDOM.render(<Routing />, document.getElementById("root"))
