# JWT

El problema que resuelve JWT es tener que almacenar un token en nuestra base de datos, Ya que el token es capaz de almacenar informacion, y no es necesario guardarlo en la base de datos

### Que es un token? 

Un token es una cadena alfanumerica con caracteres alfanumericos
ej:

    oaisfuoahf2983ura9hfjakdfhj92q83rqkfjahfi3h298ryap

o 

    1233123

Ahora que sabemos que son los tokens ya podemos hablar de los JWT(Json Web Tokens), estos son un tipo de token el cual engloba una estructura, la cual es desencriptada por el servidor y asi autenticarla, estos tokens estan dividos en tres secciones

* Header

    Aqui se almacena el tipo de token y el algoritmo de encriptamiento

    
        {
        "typ": "JWT",
        "alg": "HS256"
        }

* Payload

    Esta es la parte donde se identifica al usuario, como lo es ID o nombre de usuarios


        {
        "id": "1234567890",
        "name": "Oscar Blancarte",
        "rol": “admin”
        }


* Firma

    Esta es la firma digital, de lo que se encarga es en verificar que el contendi no haya sido alterado


---

La manera en la que se utilizan es que una vez que el backend valida los datos del login por ejemplo, este retorna un un token al usuario, este token lo tiene que guardar el cliente, pues de aqui en adelante todas las peticiones tienen que llevar este token

## Ciclo de vida 

* El usuario hace login y el servidor valida los datos
* Al validar los datos este envia un token y el cliente lo almacena 
* Ahora el cliente puede hacer peticiones y el servidor 


---
En python para usar jwt podemos instalar una libreria que se llama **pyjwt** 

```python
pip install pyjwt
```
ahora podemos usar la terminar para hacer algunas pruebas, ahora en nuestra terminal podemos hacer lo siguiente

```python
import jwt 
jwt.encode({'Node':'School'},'secrets')
b'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJOb2RlIjoiU2Nob29sIn0.ZLZ4sE6FAGHG2BLWH7K14kn_1fFutt-XN9LM8p2zr6w'
```
Esto nos regresa un token, si entramos a jwt.io 
nos podemos dar cuenta que podemos ver los datos, aun que diga que el token no es valido, entonces lo que tenemos que recordar es que lo que se esta enviando no es del todo privado, pero si nos dice que no es la misma firma, entonces no tenemos que confiar en ese token

ahora para verificarlo hacemos lo siguiente

```python 
#almacenamos el token en una variable
my_token = jwt.encode({'Node':'School'},'secrets')
jwt.decode(my_token,'secrets')
#Si como segundo parametro le pasamos la firma incorrecta pues nos dara un error
```
Ahora que ya sabemos como funcionan, podemos crear una ruta que nos regrese un token de la siguiente manera:
```python
@app.route('/login',methods=['POST'])
def login():
    auth = request.authorization
    if auth and auth.password == 'passs':
        token = jwt.encode({'user':auth.username,'exp':datetime.datetime.utcnow() + datetime.timedelta(minutes=30)}, app.config['SECRET_KEY'])

        return jsonify({'token':token.decode('UTF-8')})

    return jsonify({'Message':'error'})
```
lo que hacemos es guardar los datos de autenticación, y hacemos un simple "login" y si los datos son correctos nos regresara un token.

```python 
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
```
Ahora con creamos un decorador para comprobar si nos pasa un token o no, cuando queramos entrar a ciertas urls.

```python
@app.route('/api/pizzas/', methods=['POST'])
@token_required
def add_pizza():
```
ahora agregamos el decorador y ya con esto nos validara si le estamos pasando un token o no.


---
### Links utiles
- JWT: [Referencias](https://www.oscarblancarteblog.com/2017/06/08/autenticacion-con-json-web-tokens/)

- Decoradores: [Referencias](https://recursospython.com/guias-y-manuales/decoradores/)