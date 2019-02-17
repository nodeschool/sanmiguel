# Introducción a Flask

### Desarrollo Web Con Python


Cuando hablamos de desarrollo web con Python, lo primero que se nos viene a la mente es "Django" pero en realidad hay una gran variedad de frameworks web, unos más famosos que otros, bueno ya sabemos cual es el más famoso (django), pero el día de hoy vamos a hablar acerca de Flask, este es un framework minimalista, "Así se hacen llamar ellos", pues a diferencia de Django, este no trae pilas incluidas.

Eso lo puedes ver como una desventaja o ventaja, pues elegir uno u otro depende de las necesidades que tengamos, Flask es una gran opción, cuando lo que queremos es simplicidad, entender todos los documentos de que estamos creando, pues este no te crea tantos documentos como Django y para un principiante (como yo) puede ser muy difícil entender qué está sucediendo pues gran parte de trabajo lo hace el framework por su cuenta, (Esto no tiene nada de malo, pues lo que queremos es productividad, y al venir con baterías incluidas nos ayuda a avanzar más rápido los proyectos), pero esto no quiere decir que con Flask no se pueda hacer lo que se hace con Django, pero como todo, es cuestión de gustos.

## Flask
![Flask](./img/flask.png)
## Sitio Oficial:   [http://flask.pocoo.org/](http://flask.pocoo.org/)

### Instalación
```python
pip install Flask
```
### Hola mundo
```python
  from flask import Flask

  app = Flask(__name__)

  @app.route('/')
  def index():
    return "Hola Mundo"
  
  if __name__ == '__main__':
    app.run()
```
***
### Templates
Como podemos ver es muy sencillo hacer nuestras rutas, tambien podemos renderizar html, css y js de esta manera podemos hacer las paginas mas dinamicas.

Para esto usamos "render_template", y creamos una carpeta llamada "templates" y ahi guardamos los html.
```python
from flask import Flask, render_template

@app.route('/template')
def stream():
    #No indicamos en que carpeta busque el template porque por defecto busca en la carpeta template
    return render_template('index.html')
```
***
### CSS Y JS
Para poder agregar y renderizar archivos como css y js usamos un metodo llamado "url_for", que tenemos que importar.

```python
from flask import Flask, render_template, url_for
```
Una vez importado creamos una carpeta que por convencion la llameramos "static" y ahi guardamos los archivos css y js, y para que puedan funcionar usaremos el "url_for" con las templates jinja.

```jinja2
<link rel="stylesheet" href="{{url_for('static',filename='style.css')}}">
```
Como podemos ver lo que estamos haciendo es indicarle donde buscar el archivo y el nombre del archivo, lo mismo se hace con los archivos de js.

***
### DRY
Si podemos evitar repetir algo, evitemoslo! 
Podemos evitar repetir código en las templates de la siguiente manera:

- Crear un html de base (Podemos llamarlo "layout.html")
- Usar jinja para crear un block
- Reutilizar ese bloque en otro template

```jinja2
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{title}}</title>
    <link rel="stylesheet" href="{{url_for('static',filename='style.css')}}">
</head>
<body>
    {% block content %}
    {% endblock %}
</body>
</html>
```
Ahora podemos reutilizar este layout en otro template:
```jinja2
{% extends 'layout.html'%}
{% block content%}
  <h1>Hola, ya no estoy repitiendo código! </h1>
{% endblock %}
```
***
### Impartido el dia sábado 16 de Febrero, 2019
***
# Contacto

- Jorge Luis Monge Hernández
- GitHub: [Monge1h](https://github.com/monge1h "Jorge Monge")
- Sitio Web: [monge.xyz](http://monge.xyz "www.monge.xyz")
- Presentación: [Diapositvas](https://docs.google.com/presentation/d/12a0_CapH29i8UUDiZXWXs-h-IKf9eLTpxFAFkfIWYoM/edit?usp=sharing "Diapositivas")


