from flask import Flask, jsonify, request

app = Flask(__name__)

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
    pizza = [p for p in pizzas if p['id'] == id]
    
    return jsonify(pizza[0])


@app.route('/api/pizzas/', methods=['POST'])
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
def edit_pizza(id):
    pizza = [pizza for pizza in pizzas if pizza['id'] == id]
    pizza = pizza[0]
    print(pizza)
    pizza["id"] = request.get_json()["id"]
    pizza["name"] = request.get_json()["name"]

    return jsonify(pizza)

@app.route('/api/pizzas/<int:id>', methods=['DELETE'])
def delete_pizzas(id):
    pizza = [pizza for pizza in pizzas if pizza['id'] == id]

    pizzas.remove(pizza[0])

    return jsonify({"message":"ok, se ha borrado el item"})




if __name__ == "__main__":
    app.run(debug=True)