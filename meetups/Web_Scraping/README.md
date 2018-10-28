# ¿Qué es el Web Scraping?
Según Wikipedia [Web Scraping](https://es.wikipedia.org/wiki/Web_scraping) es;
> Una técnica utilizada mediante programas de software para extraer información de  sitios web. Usualmente, estos programas simulan la navegación de un humano en la World Wide Web ya sea utilizando el protocolo HTTP manualmente, o incrustando un navegador  en una aplicación.


![alt text](https://imgredirect.milanuncios.com/fg/2405/95/240595638_2.jpg?VersionId=WuHfiBEj7Uz08sME2Q2aBNLZGDUzcr72 "Web Scraping")

### En resumen, ¿Cuál es la función del Web Scraping?
> Recopilar información de forma **automática**.

## ¿En cuál parte de la página busca?
Busca en las partes que nosotros le asignemos. El Web Scraping busca en parte específicas de la página en la que se realiza la búsqueda y no en ningún otro lugar. 

Cuando nos referimos a partes específicas quiere decir que en ciertas etiquetas `HTML`. 

Se puede extraer toda la información de la página sin ningún filtro, pero si esto no es necesario puede conllevar a un mayor tiempo de espera, algo que no es muy recomendable ya que lo que buscamos es tener todo al instante, por eso el motivo de realizar filtros de etiquetas.

***
> El hecho que sea automático no quiere decir que reemplazará  por completo a un humano, aunque puede configurarse demasiado bien para tratar de hacer el mejor filtro posible, todo terminará recayendo en las habilidades del programador.
***
## Inconvenientes que pueden surgir

- No todos los sitios tienen un standar de maquetación.
- La abundancia de anuncios en los sitios web.
- Que se cargue contenido mediante JavaScript.

## Hmm, no sé, ¿podrías darme un ejemplo para entender mejor?

Imagina que quieres armar tu propia página web que sea de noticias a nivel mundial, hacer esto requiere de tiempo en observar cuando hay noticias nuevas, y hacerlo en cada una de las páginas que consideras que brindar información confiable, te resultaría demasiado tedioso hacerlo manualmente. 

Lo que necesitas es velocidad para publicar esas noticias para que aparezcan en las busquedas de Google y las personas puedan visitar el sitio, generando así visitas, si agregas que en tu sitio hay anuncios que te generan remuneración, entre más visitas, más posibilidades de generar ingresos y simplemente con copiar y pegar texto. Sería bueno tener una forma de automatizar todo esto, ¿No?

![alt text](https://s3.amazonaws.com/Supermetrics/images/featured+image+adsense+post1.png "Adsense")

## Analizando...

> "Quiero dinero, pero quiero hacer poco esfuerzo".

Un posible solución a lo que se planteó anteriormente es; generar un archivo que haga web scraping en ciertos sitios, estos sitios serán los que escogiste como fuente confiable, cada uno de estos sitios tiene su estructura distinta, tienes que inspeccionarlos y declarar validaciones para cada uno de ellos, es decir realizar filtros en cada caso.

Una vez sepas la estructura y realices la obtención de información ya puedes republicarla en tu sitio web todo de forma automática ya que tienes claro cuál es el título de la noticaia, la fecha/hora, el cuerpo de la noticia y hasta las noticias relacionadas, todo esto luego de hacer la validaciones necesarias.

Todo dependerá al final de que tantas validaciones tenga tu código, por ejemplo de no publicar algo repetido teniendo control sobre la información que es nueva en comparación con la anterior revisión dek sitio. Si lo has notado, hay veces que muchas páginas tienen la misma información y no quiere decir que todos la redactaron, a lo mejor es simple web scraping.

## Ok, voy entendiendo. Pero, ¿Con qué puedo hacer Web Scraping?

Tenemos que hablar de lenguajes de programación para esta tarea, siempre hay alternativas para cada situación, y lo mismo pasa acá.

Los más frecuentados son;

- Python
- PHP 
- JavaScript

Estas alternativas dentro de ellas hay más alternativas pero en cuando a librerias/paquetes se refiere.

###Bueno me parece una interesante, pero qué pasa cuando el encargado del sitio soy yo, y no quiero que saquen información de la página

Dos formas para prevenirlo;
- Bloqueo de bots con **"robots.txt"**
- Agregar Captcha al sitio

![alt text](https://www.humanlevel.com/wp-content/uploads/robot4.png "Robot")

> Robots.txt es un archivo de texto con extensión .txt, que creamos y subimos a nuestro sitio Web y que utilizamos para impedir que los robots de ciertos buscadores rastreen contenido que no deseamos que indexen ni muestren en sus resultados. Es decir, es un archivo público que usamos para indicar a esos rastreadores o arañas qué parte o partes no deben entrar a rastrear e indexar de nuestra página web. 
[Fuente](https://www.humanlevel.com/diccionario-marketing-online/robots-txt)

## Conclusión
El Web Scraping es una gran herramienta para recolectar información, las aplicaciones que podría tener son muchas pero depende de las necesidades de cada persona/proyecto. Información de una forma rápida. 

Si eres el que le dá mantenimiento algún sitio y no quieres que te saquen información, configura bien.

***

**Sábado 27 Octubre-2018**
**[Mauricio Martínez](https://github.com/moudev)**