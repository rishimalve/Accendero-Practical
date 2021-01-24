from werkzeug.utils import redirect
from config import Config
from flask import Flask, jsonify, request, abort
from flask.helpers import url_for
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt, check_password_hash
from flask_migrate import Migrate

app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)
migrate = Migrate(app, db)
bcrypt = Bcrypt(app)

from resources import models

@app.route('/')
def hello():
    return "lol"


@app.route('/api/register', methods = ['GET','POST'])
def register():
    body = request.get_json()
    user = models.User(username=body.get('username'),email=body.get('email'))
    user.hash_password(body.get('password'))
    id = user.id
    print(user.password)
    db.session.add(user)
    db.session.commit()
    return jsonify({ 'username': user.username })


@app.route('/api/login', methods = ['GET','POST'])
def login():
    body = request.get_json()
    username = body.get('username')
    password = body.get('password')

    user = models.User.query.filter_by(username=username).first()

    if not user or not check_password_hash(user.password,password):
        return "try again"
    return "success"



if __name__ == '__main__':
    db.create_all()
    db.session.commit()
    app.run()
