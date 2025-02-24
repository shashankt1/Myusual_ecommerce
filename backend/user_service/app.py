from flask import Flask, request, jsonify
from pymongo import MongoClient
from werkzeug.security import generate_password_hash
import os

app = Flask(__name__)
client = MongoClient(os.getenv("MONGO_URI"))
db = client.ecommerce
users_collection = db.users

@app.route('/register', methods=['POST'])
def register_user():
    data = request.json
    username = data['username']
    password = generate_password_hash(data['password'])
    
    if users_collection.find_one({"username": username}):
        return jsonify({"message": "User already exists"}), 400
    
    users_collection.insert_one({"username": username, "password": password})
    return jsonify({"message": "User registered successfully"}), 201

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5001)