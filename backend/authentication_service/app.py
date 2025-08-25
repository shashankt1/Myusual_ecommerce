from flask import Flask, request, jsonify
import jwt
import datetime
from pymongo import MongoClient
from werkzeug.security import check_password_hash
import os
from waitress import serve

app = Flask(__name__)

mongo_uri = os.getenv("MONGO_URI", "mongodb://mongo:27017/ecommerce")
client = MongoClient(mongo_uri)
db = client.ecommerce
users_collection = db.users

SECRET_KEY = os.getenv("SECRET_KEY", "your_secret_key")

@app.route('/login', methods=['POST'])
def login_user():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"message": "Username and password are required"}), 400

    user = users_collection.find_one({"username": username})
    if user and check_password_hash(user['password'], password):
        token = jwt.encode({
            'user_id': str(user['_id']),
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
        }, SECRET_KEY, algorithm='HS256')
        return jsonify({'token': token})

    return jsonify({"message": "Invalid credentials"}), 401

if __name__ == '__main__':
    serve(app, host='0.0.0.0', port=5004)