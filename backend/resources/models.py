from app import db, bcrypt
from flask_bcrypt import generate_password_hash, check_password_hash


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password = db.Column(db.String(128))

    def hash_password(self, password):
        self.password = generate_password_hash(password).decode('utf8')
        
    def check_password(self, password):
        return check_password_hash(self.password, password)
        