# Primeros pasos

Para crear una api sencilla con Flask lo podemos hacer con jsonify que es un método que ya trae instalado Flask, para poder utilizarlo solo necesitamos importarlo de la siguiente manera.

```python
from flask import Flask, jsonify
```
Ya con esto podemos empezar a serializar los datos que queremos que se muestran en el json, como ya sabemos python es un lenguaje con pilas precargadas y ya tiene su propio módulo de JSON entonces ¿por qué no usar el módulo de python? la mayor diferencia es que la función jsonify de flask ya viene codeado con los headers mime type de ‘application/json’ cosa que json.dumps() no, por eso utilizaremos jsonify.

Ahora que ya podemos serializar los datos usemos jsonify!

```python
pizzas = [
    {
        "id":1,
        "name": "Suprema"
    },
    {
        "id":2,
        "name": "Peperoni"
    },
    {
        "id":3,
        "name": "Hawaina"
    }
]


@app.route("/api/pizzas/",methods=['GET'])
def get_pizzas():
    return jsonify(pizzas)

```

Ahora si entramos a esa url con el metodo "GET" nos regresara el json de nuestro diccionario en python, otra cosa que podras notar cuando mires el código es que estamos usando el mismo endpoint y siempre en plural.

```python
@app.route("/api/pizzas/")
```
y esto es porque nosotros vamos a indicarle al servidor, que hacer con los datos mediante el método/verbo HTTP con el cual se hizo la petición, es decir que nos olvidaremos de las siguientes endpoints:

```python
@app.route("/api/delete_pizza")
```
y usaremos:
```python
@app.route("/api/pizzas/", methods=['DELETE'])
```
Ahora escribiremos la lógica de borrar bajo este endpont.

---
### Links utiles

- Flask jsonify: [docs](http://flask.pocoo.org/docs/0.12/api/#jsonify)

