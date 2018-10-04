class App extends React.Component {
  state = {
    componenteCargado: false
  }
  
  componentDidMount(){
    this.setState({componenteCargado: true})
    console.log("Cargo!")
  }
  
  render() {
   let arr = new Array(100)
    //creamos un array con longitud de 100
    arr.fill(10, 0)
    //llenmos el array con 10, desde la pocision 0
    return (
      <div style={{background: this.state.componenteCargado ? "white": "black"}}>
        <p>ReactJS</p>

        {arr.map((e, index) => (
          <FunctionalComponent color={index % 2 == 0 ? "red" : "black"} />
        ))}
      </div>
    )
  }
}

const FunctionalComponent = props => {
  return (
    <b style={{ color: props.color }}>
      <br />
      Soy un functional component
    </b>
  )
}

ReactDOM.render(<App />, document.querySelector("#root"))
