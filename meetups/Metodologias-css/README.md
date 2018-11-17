#Metodologías para escribir CSS

Normalmente cuando se escribe CSS se utiliza algún framework para facilitar el trabajo y terminar en una menor cantidad de tiempo, lo cual se vuelve una constumbre y se deja un poco de lado escribir desde cero tus propias reglas CSS.

Supongamos que decides hacer todo desde cero, sin utilizar frameworks y de solamente llamar clases desde ellos para darle forma a tus estilos. Decides tomar el "reto" de hacer todo de forma personalizada, ya sea solamente por practicar o porque te sientes más cómodo utilizando tus propias reglas.

Empiezas de una forma fluida estructurando tus reglas CSS, podría decirse estilos de botones, formularios, y la estructura básica de una página web, cuando es un proyecto pequeño no se necesitan muchas variantes de interfaz gráfica para el usuario asi que la cantidad de posibles estilos disminuye. Se recalca que cuando es un proyecto pequeño no hay mucho problema.

Cuando la página va creciendo se van agregando más reglas, y es posible que no sigas un estandar para hacerlo, sino que solo agregas cosas al momento que lo necesitas, por "salir del apuro", lo que conlleva que todo se vuelva un desorden. Por ejemplo podría tomarse el caso de aplicar estilo a un listado, al elemento padre le asignas una clase pero a sus hijos los llamas directamente por el nombre de su etiqueta.

 ```css
   .elemento-padre-lista > li{
  
    }

```
Bien, ahora supone que tienes  dentro de esos elemento hijos otra etiqueta para agregar texto o algún icono, su jerarquía cambia y la forma para seleccionar más elemento hijos también ya que todo se va acumulando algo dentro de algo y para poder acceder a ellos necesitas escribir especificamente la jerarquia para acceder a esos elementos, eso lleva a escribir más CSS y resulta baaaaaastante tedioso, ese tipo de detalles los notarás si practicas mucho, observa como quedaría la jerarquía para acceder a hijos dentro de hijos.

```css
.elemento-padre-lista  li a i {
  
 }
```
¿Te parece tedioso hacer eso?. Ahora imaginate el caso que de la nada toque cambiar esa regla ya que se cambió la estructura del HTML, que ahora los tag `<a>` y `<i>` estén dentro de un `<span>`, a partir de ese momento se pierde la jerarquía que está en nuestro CSS.

Debido a ese tipo de casos donde se pierde la jerarquía por no especificar bien a qué se tiene que aplicar estilo, o mejor dicho hay relevancia en ciertos factores para aplicar estilo a nuestro HTML, para tal motivo es importante tener un concepto de;

## Especificidad

> Especificidad es el manera mediante la cual los nagevadores deciden qué valores de una propiedad CSS son más relevantes para un elemento y, por lo tanto, serán aplicados. La especificidad está basada en las reglas de coincidencia que están compuestas por diferentes tipos de selectores CSS.
> [Fuente][1]

#### Tratemos de entender con un ejemplo
**Declaración directa vs estilos heredados**
***
Los estilos para elementos objetivo de una declaración directa siempre tienen preferencia sobre los estilos heredados, sin importar la especificidad de la regla heredada.

```css
#parent {
  color: green;
}
h1 {
  color: purple;
}
```
Con el siguiente HTML:

```html
<html>
<body id="parent">
  <h1>¡Aquí va un título!</h1>
</body>
</html>
```
[Fuente Ejemplo][2]

**¿Qué color crees que resulte? Explica tu análisis.** Luego de una pequeña explicación sobre especificidad y su impacto en nuestras reglas CSS es momento de pasar directamente a la forma para hacerlo de una manera ordenada y cool.

### ¿Qué?¿En realidad hay formas para escribir CSS así tal cual como en código?
La respuesta es sí.

Ya se planteó situaciones donde trabajar de una forma más correcta nos ahorraría una gran cantidad de trabajo,  no hacerlo tan tedioso, eso quiere decir que ya alguién tuvo esas mismas situaciones y creó formas para hacerlo más fácil, todo basándose en sus necesidades.

A estas formas para escribir CSS se les llama *metodologías*, acá tienes un pequeño concepto sobre éste término.

> ..."hace referencia al conjunto de procedimientos racionales utilizados para alcanzar el objetivo o la gama de objetivos..."
>[Fuente][3]

Con ese breve concepto pasemos a lo siguiente; una paǵina web puede tener muchas rutas, variantes de vistas que llevan una gran cantidad de detalle, algunas pequeñas llevan más que una grande, tienen un estilo para acción de la interfaz gráfica, eso es personalizar en serio, pero si te das cuenta es lo mismo que realizan los frameworks CSS. 

Alguna vez has revisado el source de esos frameworks y la cantidad de variantes que puede llegar a tener un sencillo botón, necesitas formas para hacerlo seccionado para lograr rápidez en modificar algo, podemos llamarlo que sea por módulos, y se puede aplicar a nuestro CSS.

### CSS Escalable y Modular
>"Con el pasar del tiempo han surgido formas de escribir código escalable y modular por medio del lenguaje de estilos CSS llevando estas metodología a una filosofía que relaciona al lenguaje de estilos con el HTML como el lenguaje de marcado que define la estructura del sitio. Hay muchas ventajas en tener un código estructurado de forma modular ya que este será reusable en todos sus aspectos lo que lo vuelve flexible y escalable permitiéndonos iterar en bloques independientes de código dándonos esto un mejor desempeño a la hora de la creación, mantenimiento y modificación del sitio." [Fuente][4]

Se mostrarán tres metodologías para escribir un mejor CSS, son las mas comentadas en diversos blogs de Internet, se te invita a indagar en la búsquedad de otros.

#### (SMACSS) "Scalable and Modular Architecture for CSS"
***
>"...sus principales enfoquse son aumentar el valor semántico de una sección del documento y disminuir la expectativa de una estructura HTML. Este sistema enfoca la categorización de estilos CSS y los clasifica en 5 grupos de reglas que se agrupan en archivos separados. **(Base, Layout, Module, State, Theme)**." [Fuente][5]

[![SMACSS](https://www.soyfrontend.com/wp-content/uploads/2016/02/smacss-metodologia.jpg "SMACSS")](https://www.soyfrontend.com/wp-content/uploads/2016/02/smacss-metodologia.jpg "SMACSS")

**Base**: Las reglas agrupadas en esta categoría se aplican a los selectores de elementos o etiquetas HTML. Hay que tener en cuenta que los estilos para los selectores ID y CLASS no se aplican en este grupo de reglas.

**Layout**: Las reglas de estilos agrupados en layout se aplican a los componentes estructurales de un sitio como por ejemplo: el #header, #footer, #sidebar etc, en si a las diferentes partes o regiones que forman parte de  la estructura de un diseño.

**Module**: Esta categoría agrupa los estilos que se aplican a los elementos considerados como modulos, que a la final vienen siendo los elementos que se ubican dentro de los elementos principales del Layout como por ejemplo, los widgets, barras de navegación o cualquier componente que se considere secundario.

**State**: Las reglas de estado reúnen estilos de cambios como los estado hover de las navegaciones, ítems activados de componentes que tienen elementos activos como acordeones etc, es decir componentes de módulos que pueden cambiar de aspecto según la interacción de los usuarios.

**Theme**: Apila las reglas de estilos que se aplican al proyecto como tal, lo que lo vuelve único e identificativo, aquí se reúnen  las reglas de color, tipografía etc. Una capa visual que nos permite cambiar de apariencia fácilmente.

```html
<div class="bloque bloque-simple">
	<div class="bloque-control activo">
		<h1 class="bloque-titulo">Titulo 1</h1>
	</div>
	<div class="bloque-detalle activo"> Lorem ipsum dolor sit amet </div>
	Lorem ipsum dolor sit amet 
</div>
```
[https://smacss.com/][6]

#### (OOCSS) “Object Oriented CSS”
***
>"La idea de la Metodología OOCSS es separar en cierta forma la estructura del sitio de su piel “Skin” también podemos considerar la separación del contenedor y su contenido. Ahora, cuando separáramos la estructura de la piel del sitio para definir características visuales el código generado para esto puede ser reutilizado en otra situación donde lo requiramos. El objetivo de este método es fomentar la reutilización de código lo que sin duda nos convertirá en frontends más eficientes generando hojas de estilos fáciles de mantener." [Fuente][7]

[![OOCSS](https://hub.packtpub.com/wp-content/uploads/2018/03/268_Cover-Image.png "OOCSS")](https://hub.packtpub.com/wp-content/uploads/2018/03/268_Cover-Image.png "OOCSS")

Ejemplo:

```html
<div class="bloque simple">
	<div class="bloque-control abierto">
		<h1 class="bloque-titulo">Titulo 1</h1>
	</div>
	<div class="bloque-detalle abierto"> Lorem ipsum dolor sit amet </div>
	Lorem ipsum dolor sit amet 
</div>
```
**¿Te resulta familiar el ejemplo?**

>"Esta metodología es útil cuando tenemos muchos componentes  y tengamos la necesidad de combinarlos, mezclarlos y mostrarlos de forma diferentes manteniendo la misma estructura, un buen ejemplo de este enfoque es el mismo Bootstrap, un sistema complejo lleno de componentes con diferente apariencia donde su objetivo es crear un completo sistema capaz de soportar  cualquier interfaz de usuario que el desarrollador o frontend desee armar."  [Fuente][8]

[ http://oocss.org/][9]

#### (BEM) “Block, Element, Modifier”

> "...está al otro lado del espectro de SMACSS. Este método viene de los desarrolladores del buscador Yandex y en si es una convención de nomenclatura que nos presenta una manera inteligente de darle nombres de clases coherentes a los diferentes elementos para darle más sentido a lo que desarrollamos y así al darle estilos se entienda mas la relación HTML, CSS. " [Fuente][10]

**Block:**(Bloque) Este es el nombre del elemento padre.

**Element:**(Elemento) Este es el nombre del elemento dentro del bloque.

**Modifier**: (Modificador) Esta es Cualquier modificación asociada con el bloque o el elemento.

[![BEM](https://www.soyfrontend.com/wp-content/uploads/2016/03/bem-elementos.jpg "BEM")](https://www.soyfrontend.com/wp-content/uploads/2016/03/bem-elementos.jpg "BEM")

Esta es una metodología que te ayuda a saber directamente que modificar en tu página web. Recuerdas el caso que se mencionó al inicio, el de crear tu propios estilos para un sitio en particular, pues esta metodología ya te puede ayudar en gran manera.


------------

- ##### Revisa los frameworks CSS y tratar de identificar algún patrón que te brinde una pista de la metología que implementa.

------------

- ##### ¿Si tuvieras que escribir tu propio framework CSS que metodología usuarías? Debes de tener en cuenta que mas personas puedan utilizarla en cualquier proyecto

------------
Sábado 17 de Noviembre - 2018
Contenido creado para NodeSchool San Miguel

:fa-user: [Mauricio Martínez](https://github.com/mauriciormr "Mauricio Martínez")
:fa-twitter: [@codemart_dev](https://twitter.com/codemart_dev/ "@codemart_dev")

***
 [1]: https://developer.mozilla.org/es/docs/Web/CSS/Especificidad "Fuente"
[2]: https://developer.mozilla.org/es/docs/Web/CSS/Especificidad#Declaraci%C3%B3n_directa_vs_estilos_heredados "Fuente"
[3]: https://es.wikipedia.org/wiki/Metodolog%C3%ADa "Fuente"
[4]: https://soyfrontend.com/metodologias-modulares-en-css/ "Fuente"
[5]: https://soyfrontend.com/metodologias-modulares-en-css/ "Fuente"
[6]: https://smacss.com/ "https://smacss.com/"
[7]: https://soyfrontend.com/metodologias-modulares-en-css/ "Fuente"
[8]: https://soyfrontend.com/metodologias-modulares-en-css/ "Fuente"
[9]:  http://oocss.org/ " http://oocss.org/"
[10]: https://soyfrontend.com/metodologias-modulares-en-css/ "Fuente"
