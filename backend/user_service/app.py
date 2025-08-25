from flask import Flask, request, jsonify
from pymongo import MongoClient
from werkzeug.security import generate_password_hash
import os
from waitress import serve

app = Flask(__name__)

mongo_uri = os.getenv("MONGO_URI", "mongodb://mongo:27017/ecommerce")
client = MongoClient(mongo_uri)
db = client.ecommerce
users_collection = db.users

@app.route('/register', methods=['POST'])
def register_user():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"message": "Username and password are required"}), 400

    if users_collection.find_one({"username": username}):
        return jsonify({"message": "User already exists"}), 400

    hashed_password = generate_password_hash(password)
    users_collection.insert_one({"username": username, "password": hashed_password})

    return jsonify({"message": "User registered successfully"}), 201

if __name__ == '__main__':
    serve(app, host='0.0.0.0', port=5001)