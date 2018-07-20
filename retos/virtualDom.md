# Reto Virtual Dom
## recursos
- https://www.w3schools.com/jsref/jsref_random.asp
- https://www.w3schools.com/jsref/met_document_createelement.asp

# Reto
crear una funcion que retorne caracteres aleatorios del alfabeto  y mostrar cada conjunto de caracteres como nuevos nodos en el documento quedan libre de usar metodos como sea necesario

## Ejemplo
```javascript
let p = function(){
  return "aabbcc".split("").sort((a,b)=>Math.random()-0.5).join("")
}
console.log(p())// salida : aleatoria , copiar ejemplo
```

## Limitantes
- No deben de existir más de 2 caracteres iguales, como en el ejemplo [ "aabbccc" ] no es permitido, porque contiene 3 "c"
- Minimo texto a crear 3  + Num aleatorio
- Maximo texto 20
- Minimo caracteres 3
- Maximo longitud caracteres 20
