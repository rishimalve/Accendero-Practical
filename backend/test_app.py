import os
import unittest
from app import app
from database import db
from resources import models
from flask import request, jsonify
from flask_migrate import Migrate

class TestCase(unittest.TestCase):

    def setUp(self):
        app.config['TESTING'] = True
        app.config['WTF_CSRF_ENABLED'] = False
        basedir = os.path.abspath(os.path.dirname(__file__))
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'test.db')
        db.init_app(app)
        migrate = Migrate(app, db)
        self.app = app.test_client()

        with app.app_context():
            db.create_all()
    
    
    def tearDown(self):
        db.session.remove()
        with app.app_context():
            db.drop_all()

    
    def test_registration(self):

        # add a new user
        with app.app_context():
            res = self.app.post('/api/register', json = dict(username='test1',email='test1@abc.com',password='qwerty'))
            self.assertEqual(res.status_code, 201)
        
        # add duplicate user
        with app.app_context():
            res = self.app.post('/api/register', json = dict(username='test1',email='test1@abc.com',password='qwerty'))
            self.assertEqual(res.status_code, 409)
        
        # add duplicate username
        with app.app_context():
            res = self.app.post('/api/register', json = dict(username='test1',email='test2@abc.com',password='qwerty'))
            self.assertEqual(res.status_code, 409)
        
        # add duplicate username
        with app.app_context():
            res = self.app.post('/api/register', json = dict())
            self.assertEqual(res.status_code, 409)
    
    
    def test_login(self):

        # login with existing user
        with app.app_context():
            res = self.app.post('/api/register', json = dict(username='test1',email='test1@abc.com',password='qwerty'))
            res = self.app.post('/api/login', json = dict(username='test1',password='qwerty'))
            self.assertEqual(res.status_code, 201)
        
        # login with non-existing user
        with app.app_context():
            res = self.app.post('/api/register', json = dict(username='test1',email='test1@abc.com',password='qwerty'))
            res = self.app.post('/api/login', json = dict(username='test2',password='qwerty'))
            self.assertEqual(res.status_code, 401)

        # login with blank user
        with app.app_context():
            res = self.app.post('/api/login', json = dict())
            self.assertEqual(res.status_code, 401)

    def test_calculateSentiment(self):
    
        # blank sentence
        with app.app_context():
            res = self.app.post('/api/register', json = dict(username='test1',email='test1@abc.com',password='qwerty'))
            res = self.app.post('/api/login', json = dict(username='test1',password='qwerty'))
            res = self.app.post('/api/calculateSentiment', json = dict(message='',id=1))
            self.assertEqual(res.status_code, 400)

        # non-blank sentence
        with app.app_context():
            res = self.app.post('/api/register', json = dict(username='test1',email='test1@abc.com',password='qwerty'))
            res = self.app.post('/api/login', json = dict(username='test1',password='qwerty'))
            res = self.app.post('/api/calculateSentiment', json = dict(message='I am successful',id=1))
            self.assertEqual(res.status_code, 201)
    

    def test_getHistory(self):
        
        # get user history
        with app.app_context():
            res = self.app.post('/api/register', json = dict(username='test1',email='test1@abc.com',password='qwerty'))
            res = self.app.post('/api/login', json = dict(username='test1',password='qwerty'))
            res = self.app.post('/api/calculateSentiment', json = dict(message='i am happy',id=1))
            res = self.app.post('/api/calculateSentiment', json = dict(message='i am sad',id=1))
            res = self.app.get('/api/history', json = dict(id=1))
            self.assertEqual(res.status_code, 201)


    if __name__ == '__main__':
        unittest.main()