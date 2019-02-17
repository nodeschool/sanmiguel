from flask import Flask, render_template
from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, SubmitField
from wtforms.validators import DataRequired, Email
from flask_mail import Mail, Message

app = Flask(__name__)

#Configuracion de mail
app.config['MAIL_SERVER'] = 'smtp.googlemail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = ""
app.config['MAIL_PASSWORD'] = ""
#SECRET KEY para proteger de CSRF
app.config['SECRET_KEY'] = 'da31eebaa4710c7db5c88d8e58d47b32'


mail = Mail(app)


#Se crea mediante flask-wtf una clase con los form y sus validaciones
class PesoForm(FlaskForm):
    nombre = StringField('Ingrese su nombre',validators=[DataRequired()])
    peso = DecimalField('Ingrese su peso',validators=[DataRequired()])
    altu = DecimalField('Ingrese su altura',validators=[DataRequired()])
    email = StringField('Ingrese su email',validators=[DataRequired(),Email()])
    submit = SubmitField('Enviar')

def imcCal(peso,altura):
    imc = (peso)/(altura**2)
    if imc > 40 and imc < 50:
        respuesta = "Padece de obecidad morbida"
    if imc > 35 and imc < 40:
        respuesta = "Padece de obecidad nivel 2"
    if imc > 30 and imc < 35:
        respuesta = "Padece de obecidad nivel 1"
    if imc > 25 and imc < 30:
        respuesta = "Padece de sobrepeso"
    if imc > 20 and imc < 25:
        respuesta = "Tienes un peso saludable"
    if imc > 5 and imc < 20:
        respuesta = "Tu peso no es saludable, estas muy delgado"
    return respuesta

@app.route('/imc', methods=['GET','POST'])
def rutaImc():
    #Se hace una instancia de la clase PesoForm()
    form = PesoForm()
    #Esto solo funcionara cuando los datos sean verificados
    if form.validate_on_submit():
        resultado =  imcCal(form.peso.data,form.altu.data)
        enviar(resultado,form.email.data)
        return "Se ha enviado el correo con sus resultados"
    return render_template('imc.html', form=form)

#Funcion 
def enviar(mensaje,destinatario):
    msg = Message(mensaje,sender="tucorreo@correo.com",
                  recipients=[destinatario])
    mail.send(msg)
    return "se ha enviado el correo"

if __name__ == "__main__":
    app.run(debug=True)