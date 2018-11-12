import React, { Component } from "react"
import NotFound from "./NotFound"
import RankBoard from "./RankBoard"
import Home from "./Home"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact={true} path="/" component={Home} />
          <Route exact={true} path="/rankboard" component={RankBoard} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    )
  }
}

export default Routes
