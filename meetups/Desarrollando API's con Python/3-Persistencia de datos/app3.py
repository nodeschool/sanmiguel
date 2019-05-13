from flask import Flask, jsonify, request, make_response
import jwt
import datetime
from functools import wraps
from flask_sqlalchemy import SQLAlchemy
from marshmallow import Schema, fields

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///site.db'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SECRET_KEY"] = '1234'

db = SQLAlchemy(app)

class Pizzas(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(50), nullable=False, unique=True)

class PizzaSchema(Schema):
    id = fields.Int()
    name = fields.Str()


pizza_schema = PizzaSchema()

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']

        if not token:
            return jsonify({'message': 'Token is missing!'}), 401

        try:
            data = jwt.decode(token, app.config['SECRET_KEY'])
        except:
            return jsonify({'message': 'Token is invalid!'}), 401

        return f(*args, **kwargs)

    return decorated



@app.route("/api/pizzas/",methods=['GET'])
def get_pizzas():
    pizzas = Pizzas.query.all()
    pizzas_schema = PizzaSchema(many=True)
    results = pizzas_schema.dump(pizzas)

    return jsonify(results.data)


@app.route('/api/pizzas/<int:id>', methods=["GET"])
def get_pizzas_by_name(id):
    pizza = Pizzas.query.get(id)
    result = pizza_schema.dump(pizza)

    return jsonify(result.data)


@app.route('/api/pizzas/', methods=['POST'])
@token_required
def add_pizza():
    new_pizza = Pizzas(name=request.get_json()['name'])
    
    db.session.add(new_pizza)
    db.session.commit()
    result = pizza_schema.dump(new_pizza)

    return jsonify({'succes':200,"datos":result.data})


@app.route('/api/pizzas/<int:id>', methods=['PUT'])
@token_required
def edit_pizza(id):
    pizza = Pizzas.query.filter_by(id=id).first()
    pizza.name = request.json["name"]

    result = pizza_schema.dump(pizza)

    db.session.commit()

    

    return jsonify({'message':'Datos actualizados con exito','datos':result.data})

@app.route('/api/pizzas/<int:id>', methods=['DELETE'])
@token_required
def delete_pizzas(id):
    pizza = Pizzas.query.get(id)

    db.session.delete(pizza)
    db.session.commit()

    return jsonify({'message':'Datos eliminados con exito'}),200

@app.route('/login',methods=['POST'])
def login():
    auth = request.authorization
    if auth and auth.password == 'passs':
        token = jwt.encode({'user':auth.username,'exp':datetime.datetime.utcnow() + datetime.timedelta(minutes=30)}, app.config['SECRET_KEY'])

        return jsonify({'token':token.decode('UTF-8')})

    return make_response('Could not verify',401,{'WWW-Authenticate':'Basic realm="Login Requiered"'})

if __name__ == "__main__":
    app.run(debug=True)