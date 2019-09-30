<<<<<<< HEAD
# Persistencia de datos

Para poder guardar los datos y que estos datos persistan, definitivamente necesitamos usar una base de datos y para lograr esto nosotros usaremos un orm llamado SQALchemy, para instalarlo hacemos lo siguiente:

```python
pip install Flask-SQLAlchemy
```

y un simple ejemplo de como usarlo:
```python
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///example.sqlite"
db = SQLAlchemy(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)


db.session.add(User(name="Flask", email="example@example.com"))
db.session.commit()

users = User.query.all()
```

Lo que estamos haciendo es indicandolo donde estara la base de datos, en este caso es una de **sqlite** y hacemos el modelo que representara a nuestra tabla.

Pero un problema que podemos tener es a la hora de serializar los datos, porque ahora lo que regresara es un objeto, entonces para serializarlo tendremos que usar otra libreria que se llama Flask-Marshmallow.

Se instala asi:
```python
pip install flask-marshmallow
```

Ahora creamos el schema similar a nuestro modelo:
```python
class Pizzas(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(50), nullable=False, unique=True)

class PizzaSchema(Schema):
    id = fields.Int()
    name = fields.Str()
```

Ahora ya podemos serializar los datos que nos regresa la query.

```python
@app.route("/api/pizzas/",methods=['GET'])
def get_pizzas():
    pizzas = Pizzas.query.all()
    pizzas_schema = PizzaSchema(many=True)
    results = pizzas_schema.dump(pizzas)

    return jsonify(results.data)
```

---
### Links utiles
- Flask-SQALchemy: [Docs](https://pypi.org/project/Flask-SQLAlchemy/)

=======
# Persistencia de datos

Para poder guardar los datos y que estos datos persistan, definitivamente necesitamos usar una base de datos y para lograr esto nosotros usaremos un orm llamado SQALchemy, para instalarlo hacemos lo siguiente:

```python
pip install Flask-SQLAlchemy
```

y un simple ejemplo de como usarlo:
```python
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///example.sqlite"
db = SQLAlchemy(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)


db.session.add(User(name="Flask", email="example@example.com"))
db.session.commit()

users = User.query.all()
```

Lo que estamos haciendo es indicandolo donde estara la base de datos, en este caso es una de **sqlite** y hacemos el modelo que representara a nuestra tabla.

Pero un problema que podemos tener es a la hora de serializar los datos, porque ahora lo que regresara es un objeto, entonces para serializarlo tendremos que usar otra libreria que se llama Flask-Marshmallow.

Se instala asi:
```python
pip install flask-marshmallow
```

Ahora creamos el schema similar a nuestro modelo:
```python
class Pizzas(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(50), nullable=False, unique=True)

class PizzaSchema(Schema):
    id = fields.Int()
    name = fields.Str()
```

Ahora ya podemos serializar los datos que nos regresa la query.

```python
@app.route("/api/pizzas/",methods=['GET'])
def get_pizzas():
    pizzas = Pizzas.query.all()
    pizzas_schema = PizzaSchema(many=True)
    results = pizzas_schema.dump(pizzas)

    return jsonify(results.data)
```

---
### Links utiles
- Flask-SQALchemy: [Docs](https://pypi.org/project/Flask-SQLAlchemy/)

>>>>>>> 2edb920670f0f80f915347ba8c950abcdb9d16e5
- Flask-SQLAlchemy: [Docs](https://flask-marshmallow.readthedocs.io/en/latest/)