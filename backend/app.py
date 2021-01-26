from resources import models
from os import stat
from flask_cors.decorator import cross_origin
from config import Config
from flask import Flask, json, jsonify, request, Response, session
from flask_session import Session
from flask_bcrypt import Bcrypt, check_password_hash
from flask_migrate import Migrate
from flask_cors import CORS
import spacy
import vaderSentiment.vaderSentiment as vader
from database import db

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app) 
migrate = Migrate(app, db)
bcrypt = Bcrypt(app)
Session(app)
CORS(app, resources={
     r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)

analyzer = vader.SentimentIntensityAnalyzer()
english = spacy.load("en_core_web_sm")

with app.app_context():
    db.create_all()

@app.route('/')
def hello():
    return ""


def get_sentiments(text):
    result = english(text)
    sentences = [str(sent) for sent in result.sents]
    sentiments = [analyzer.polarity_scores(str(s)) for s in sentences]
    return sentiments


@app.route('/api/register', methods=['POST', 'OPTIONS'])
@cross_origin()
def register():
    body = request.get_json()
    check_user = models.User.query.filter_by(username=body['username']).first()

    if not check_user:
        user = models.User(username=body['username'], email=body['email'])
        user.hash_password(body['password'])
        db.session.add(user)
        db.session.commit()
        return Response(status=201)

    return Response(status=409)


@app.route('/api/login', methods=['GET', 'POST'])
@cross_origin(supports_credentials=True)
def login():
    body = request.get_json()
    username = body.get('username')
    password = body.get('password')

    user = models.User.query.filter_by(username=username).first()

    if not user or not check_password_hash(user.password, password):
        return Response(status=401)
    session['id'] = user.id
    return jsonify({"id": user.id}), 201


@app.route('/api/calculateSentiment', methods=['POST'])
@cross_origin(supports_credentials=True)
def calculateSentiment():
    if not request.json or not 'message' in request.json or request.json['message'] == "":
        return Response(status=400)
    message = request.get_json().get('message')
    print(request.get_json().get('id'))
    sentiments = get_sentiments(message)
    if sentiments[0]['pos'] > sentiments[0]['neg']:
        polarity = 'Positive'
    else:
        polarity = 'Negative'
    curr_message = models.Messages(
        message=message, user_id=request.get_json().get('id'), polarity=polarity)
    print(curr_message.polarity)
    db.session.add(curr_message)
    db.session.commit()
    return jsonify(sentiments[0]), 201


def serialize_message(msg):
    return {
        "id": int(msg.id),
        "user_id": int(msg.user_id),
        "date": msg.time.strftime("%Y-%m-%d"),
        "message": msg.message,
        "polarity": msg.polarity
    }

@app.route('/api/history', methods=['GET'])
@cross_origin(supports_credentials=True)
def getHistory():
    messages = [serialize_message(message) for message in models.Messages.query.filter_by(user_id=request.args.get('id'))]
    return jsonify(messages), 201
    


if __name__ == '__main__':
    app.run(debug=True)
