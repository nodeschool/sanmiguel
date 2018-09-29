# Que es React ? 
React es una libreria flexible, eficiente y declarativa de javascript usada para crear UIs, the deja crear UIs muy complejas dividiendolas en pequeños piezas de codigo llamadas "componentes" :heart_eyes:

# Tipos de Componentes

## Class Component
```javascript
class classComponent extends React.Component {
  state = {
    dato: true
  }

  componentDidMount() {
    console.log(this.state.dato)
  }

  render() {
    return <p>Componente con state</p>
  }
}
```

### Dividamos cada elemento por partes

Primero la estructura basica para un class component sería
```javascript
class classComponent extends React.Component {
  render() {
    return <p>Componente con state</p>
  }
}
```

creamos una clase de nombre classComponent que extiende a Component del modulo "React", dicha clase además retorna / render() / una tag de parrafo con un nodo de texto como hijo

### Ventaja de Class Component

```javascript
class classComponent extends React.Component {
  componentDidMount() {
    console.log(this.state.dato)
  }

  render() {
    return <p>Componente con state</p>
  }
}
```

Primero , nos brinda la "comodidad" de usar metodos del __componentLifeCycle__, para el ejemplo se usa __componentDidMount__ que lo que hace es llamar dicho metodo hasta que el comoponente a sido "renderizado"

## Functional Component
```javascript
const FunctionalComponent = props => <p>Functional Component</p>
```

## Stateless Component
```javascript
const StalessComponent = props => <p>Componente sin state</p>
```