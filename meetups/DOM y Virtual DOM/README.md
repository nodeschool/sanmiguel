# EL DOM
### ¿Qué es?

> El DOM es un estandard del W3C(World Wide Web Consortium)

### El DOM se define como estandard para documentos:

EL (DOM) es una plataforma e interfaz de lenguaje neutral que permite a programa y scripts tener acceso dinamicament a los datos, estructura y estilo de un documento

El W3C DOM standard se divide en 3 partes distintas:

- Core DOM - Para cualquier tipo de documento
- XML DOM - Para XML
- HTML DOM - Para HTML

# EL DOM HTML

Es un modelaje de objetos estandard de programación e interfaz para HTML. Se define así:

- Los elementos HMTL como objetos
- Las propiedades de los elementos HMTL
- Los metodos de cada elemento
- Los eventos de cada elemento

En otras palabras, el DOM HTML es un estandard de como se obtiene , cambia , modifica , agrega ó eleminan elementos HTML

# NODOS HTML Y EL DOM

![](pic_htmltree.gif)

Segun W3C el DOM HTML estandard en HTML es cualquier nodo del documento
- Todo el documento es un nodo
- Todo el HTML es un hijo de nodos
- El texto dentro de lo nodos son nodos de texto
- Incluso los comentarios son nodos

# Relación entre Nodos

![](pic_navigate.gif)

Con el modelado de Objetos javascript posee todo el poder de crear dichos nodos, así:

- JavaScript puede modificar todos los elementos de la pagina
- JavaScript puede cambiar todos los atributos de los nodos
- JavaScript puede modificar el css de la pagina y sus nodos
- JavaScript puede agregar o eliminar atributos a los nodos
- JavaScript puede accionar diferentes eventos en cada nodo

# Ejemplo

```html
 <table>
  <thead>
    <tr>
      <th>Mes</th>
      <th>Dinero Ahorrado</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Enero</td>
      <td>$100</td>
    </tr>
     <tr>
      <td>Febrero</td>
      <td>$1</td>
    </tr>
  </tbody>
</table> 
```
### Salida esperada en el navegador

|Mes|Dinero Ahorrado|
|-|-|
|Enero|$100|
|Febrero|$1|


# Eventos más comunes

|Evento|Descripción|
|--- |--- |
|onchange|Un elemento HTML ha cambiado|
|onclick|El usuario clickea el elemento|
|onmouseover|El mouse esta encima del elemento|
|onmouseout|El mouse se retira del elemento|
|onkeydown|Cuando se presiona una tecla|
|onload|El navegador a terminado de cargar la pagína|


# Introducción al Virtual DOM

## Virtual DOM

En React para cada elemento del DOM existe una copia virtual de ese objeto, pudiese llamarse una copia liviana de él

El Virtual DOM tiene las mismas propieades que el DOM en el HTML pero carece de la posibilidad de verlo en pantalla

Esto hace que sea mucho más rapido manipular el DOM antes de ser mostrado en pantalla, ya que cada cambio "Si este fuera constante" no se apreciaria en el navegador

## Ejemplo

```javascript
  let nodo = document.createElement("button")
  nodo.innerHTML = "Clickeame"
  nodo.onclick = _=> alert("Clickeado")
  document.body.appendChild(nodo)
```

# ¿Que más leer?
- Preprocesadores de lenguajes de programación
- Facebook's VirtualDOM
- ReactJS
- JSX
- React
- Linters
