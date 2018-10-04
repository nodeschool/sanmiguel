# Introducción a ReactJS
![](./logo-og.png)

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

```javascript
class classComponent extends React.Component {
  state = {
    dato: true
  }
  render() {
    return <p>Componente con state</p>
  }
}
```
Además que podemos agregar el state a dicho componente

## Functional Component
```javascript
const FunctionalComponent = props => <p>Functional Component</p>
```

Un functional component es tal cual una funcion que recive un parametro , en este caso de nombre props, a diferencia del class Component esté no consta con la posibilidad de tener state o __componentLifeCycle__

## Stateless Component
```javascript
const StalessComponent = props => <p>Componente sin state</p>
```

```javascript
class classComponent extends React.Component {
  render() {
    return <p>Componente con state</p>
  }
}
```

> Ambos componentes son StateLess ya que no poseen un state, sean estos functional o class Components

# Metodos del componentLifeCycle 

|Metodo|Uso|
|-|-|
|componentDidMount|Cuando el componente ha sido renderizado|
|componentDidUpdate|El componente recivio un cambio de estado o de props|
|componentDidCatch|El componente a arrojado un error|
|componentWillUpdate|Se manda evaluar si el componente se actualizara, si retorna true esté se actualiza|
|componentWillUnmount|El componente sera retirado del DOM|

# Metodo SetState
Si te fijaste en el class Component
```javascript
class classComponent extends React.Component {
  state = {
    dato: true
  }
  render() {
    return <p>Componente con state</p>
  }
}
```
hay una propiedad del classComponent llamada state, que al ser un objeto podríamos facilmente hacer  __state.dato = false__ , para cambiar su valor, el problema es que eso no va con React ya que dicha propiedad es __inmutable__, para ello recurimos a __setState({dato: false})__ que además es asincrónica

# ReactJS vs ReactNative
## React JS / DOM
Reacciona (de ahí viene su nombre), cambian en la interaccion tanto de  los eventos producidos por el usuario como a los del servidor. Finalmente, estos se repintan a sí mismos cuando ocurre un cambio de estado.

Con cada alteración se modifica un DOM virtual. Este hecho hace que el DOM real solo cambie en las partes que han experimentado alteraciones. Esto se traduce en una mejora del consumo de memoria y el rendimiento con respecto a otros frameworks.

## React Native
Las apps híbridas se desarollan usando HTML5, CSS y JavaScript. Es decir, utilizan el mismo código independientemente de la plataforma en que se ejecutan. Se incrustan dentro de una webview o una Web App.
Las apps nativas se desarrollan usando el lenguaje requerido por la plataforma de destino en concreto: Swift para iOS, Java y derivados para Android, etc.

Con ReactNative Las vistas las crea de forma nativa. Esto significa que tiene un intérprete que a medida que la app se va ejecutando está lo lee del HTML y va colocando cada uno de los componentes nativos en su posición.

Es decir, todas las interacciones con el usuario serán nativas.

# Leer

- RNExplorer
- ReactJS Offline documentation
- Expo
- React Navigation
- Array.fill