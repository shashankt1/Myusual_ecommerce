from flask import Flask, request, jsonify
import jwt
import datetime
from pymongo import MongoClient
import os
from werkzeug.security import check_password_hash
import secrets


app = Flask(__name__)
client = MongoClient(os.getenv("MONGO_URI"))
db = client.ecommerce
users_collection = db.users

SECRET_KEY = secrets.token_hex(32)

@app.route('/login', methods=['POST'])
def login_user():
    data = request.json
    username = data['username']
    password = data['password']
    
    user = users_collection.find_one({"username": username})
    
    if user and check_password_hash(user['password'], password):
        token = jwt.encode({'user_id': str(user['_id']), 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)}, SECRET_KEY)
        return jsonify({'token': token})
    
    return jsonify({'message': 'Invalid credentials'}), 401

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5004)
