# Gracias! :heart_eyes: :zap:

> Este README contiene info necesaria para contribuir en el desarrollo del sitio :<>

# Component Styling

## Component Naming

Since this project is not too big(by now), we can split a component up to 3 different naming files.

Lets say we have a component called **Home**

We can have our main component logic at `Home.js` and any other Component child of Home at `Home.parts.js` , in the case we need to do a split in our logic we can create a 3rd file called `Home.helpers.js`

## Structure

```shell
components
|--Home.js
|--Home.parts.js
|--Home.helpers.js
```

Also it helps making sense on imports, see:

```js
import { Loader } from "./Home.parts"
import { payloadParser } from "./Home.helpers"
```

> Plus following naming convention for components, CONSTANTS and helper functions

## SASS

```scss
.Home {
  .a-class {
    content: "yay";
  }
}
```

> This means you are styling a class **a-class** inside a component mamed **HOME**, that _PascalCase_ className is for first node of component only

### GOOD

```jsx
export default const Home = () =>{
  return (
    <div className="Home">
      <div className="a-class"></div>
    </div>
  )
}

```

### BAD

```jsx
export default const Home = () =>{
  return (
    <div>
      <div className="Home">
        <i className="logo"></i>
      </div>
    </div>
  )
}

```

> If many styles in a **PascalClassName** you can split it as many times as you want.

```scss
.Home {
  .a-class {
    .a-deep-class {
      .this-is-going-bad {
        color: red;
      }
    }
  }
}

.Home {
  .this-is-going-bad {
    color: green;
  }
}
```
