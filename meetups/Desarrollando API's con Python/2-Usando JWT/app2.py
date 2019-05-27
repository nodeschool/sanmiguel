from flask import Flask, jsonify, request, make_response
import jwt
import datetime
from functools import wraps

app = Flask(__name__)

app.config['SECRET_KEY'] = '1234'

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


@app.route('/api/pizzas/<int:id>')
def get_pizzas_by_name(id):
    pizza = []
    for p in pizzas:
        if p['id'] == id:
            pizza.append(p)
    print(p)
    return jsonify(pizza[0])


@app.route('/api/pizzas/', methods=['POST'])
@token_required
def add_pizza():
    data = request.get_json()
    if [pizza for pizza in pizzas if pizza['id'] == data['id']]:

        return jsonify({'error':'The id already exist'})
    
    pizza = {
        "id": data["id"],
        "name": data["name"]
    }
    pizzas.append(data)

    return jsonify({'succes':200,"datos":pizza})


@app.route('/api/pizzas/<int:id>', methods=['PUT'])
@token_required
def edit_pizza(id):
    pizza = [pizza for pizza in pizzas if pizza['id'] == id]
    pizza = pizza[0]
    print(pizza)
    pizza["id"] = request.get_json()["id"]
    pizza["name"] = request.get_json()["name"]

    return jsonify(pizza)

@app.route('/api/pizzas/<int:id>', methods=['DELETE'])
@token_required
def delete_pizzas(id):
    pizza = [pizza for pizza in pizzas if pizza['id'] == id]

    pizzas.remove(pizza[0])

    return jsonify({"message":"ok, se ha borrado el item"})

@app.route('/login',methods=['POST'])
def login():
    auth = request.authorization
    if auth and auth.password == 'passs':
        token = jwt.encode({'user':auth.username,'exp':datetime.datetime.utcnow() + datetime.timedelta(minutes=30)}, app.config['SECRET_KEY'])

        return jsonify({'token':token.decode('UTF-8')})

    return jsonify({'Message':'error'})

if __name__ == "__main__":
    app.run(debug=True)