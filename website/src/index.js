import React from "react"
import ReactDOM from "react-dom"
import { HashRouter as Router, Route, Switch } from "react-router-dom"
import NotFound from "./components/NotFound"
import Diploma from "./components/Diploma"
import Home from "./components/Home"
import Pal from "./components/Pal"
import PalList from "./components/PalList"
import Album from "./components/Album"
import "./assets/css/index.scss"

const Routing = () => {
  return (
    <Router basename="/" hashType="noslash">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/reconocimientos/:pal/:topic/:raw" component={Diploma} />
        <Route path="/reconocimientos/:pal/:topic" component={Diploma} />
        <Route path="/reconocimientos/:pal" component={Pal} />
        <Route path="/reconocimientos" component={PalList} />
        <Route path="/album" component={Album} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  )
}

ReactDOM.render(<Routing />, document.getElementById("root"))
