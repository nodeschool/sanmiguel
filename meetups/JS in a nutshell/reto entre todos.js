`
- Buscador en colecciones 
const DB = [
  {nombre, apellido, dirección, telefono, edad, profession},
]
Preparando algoritmo
1 - pasar la llave a la funcion x
2 - Recorremos la DB y filtramos 
3 - Decoramos los resultados
4 - mostramos los resultados
`
//Persona de template
nombre = "Albery"
apellido = "Arteaga"
dirr = "lugar x en la calle 123"
telefono = "0000666"
edad = 30
profesion = "Estudiante"

//Base de datos por defecto
const DB = [
  {
    nombre,
    apellido,
    dirr,
    telefono,
    edad,
    profesion
  },
  {
    nombre,
    apellido,
    dirr,
    telefono,
    edad,
    profesion
  },
  {
    nombre,
    apellido,
    dirr:"nula",
    telefono,
    edad,
    profesion:"ratero"
  }
]

const buscar = filtro=>{
  let results = []
  for(e of DB){
   for(prop of Object.keys(e)){
      if(e[prop].toString().match(filtro)){
        results.push(e)
        break;
      }
   }
  }
  return results
}
let found = buscar("a")

for(el of found){
  console.log(`
  ||||||||||||||||||||||||||||||||||
  ||||||||||||||||||||||||||||||||||
  ||| ${el.nombre}, ${el.apellido}||
  ||||||||||||||||||||||||||||||||||
  ||| Profesión: ${el.profesion}||||
  ||||||||||||||||||||||||||||||||||
  ||| Edad: ${el.edad}||||||||||||||
  ||| Dirección: ${el.dirr}|||||||||
  ||||||||||||||||||||||||||||||||||
  `)
}

// ECS7 , ECS6 , template literals, babel