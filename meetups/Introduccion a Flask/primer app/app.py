from flask import Flask, render_template, url_for

app = Flask(__name__)

#Hola Mundo
@app.route('/')
def index():
    return "<h2> Hola mundo </h2>"

@app.route('/nodeschool')
def node():
    return "NodeSchool San Miguel"

#Pasando variables mediante la ruta 
@app.route('/saludo/<nombre>',methods=['GET','POST'])
def saludo(nombre):
    return f"saludos {nombre}"

#Ruta para el multitwitch
@app.route('/streamers/<path:stream>')
def stream(stream):
    streamers = stream.split('/')
    #Le pasamos la lista 
    return render_template('index.html',streams=streamers,title='Node')


if __name__ == "__main__":
    app.run(debug=True,port=8080)