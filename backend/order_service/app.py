from flask import Flask, request, jsonify
from pymongo import MongoClient
import os
from waitress import serve

app = Flask(__name__)

mongo_uri = os.getenv("MONGO_URI", "mongodb://mongo:27017/ecommerce")
client = MongoClient(mongo_uri)
db = client.ecommerce
orders_collection = db.orders

@app.route('/orders', methods=['GET'])
def get_orders():
    orders = list(orders_collection.find({}, {"_id": 0}))
    return jsonify(orders), 200

@app.route('/place-order', methods=['POST'])
def place_order():
    data = request.json
    user_id = data.get('user_id')
    product_id = data.get('product_id')

    if not user_id or not product_id:
        return jsonify({"message": "user_id and product_id are required"}), 400

    orders_collection.insert_one({"user_id": user_id, "product_id": product_id})
    return jsonify({"message": "Order placed successfully"}), 201

if __name__ == '__main__':
    serve(app, host='0.0.0.0', port=5003)
