from flask import Flask, request, jsonify
from pymongo import MongoClient
import os

app = Flask(__name__)
client = MongoClient(os.getenv("MONGO_URI"))
db = client.ecommerce
orders_collection = db.orders

@app.route('/orders', methods=['GET'])
def get_orders():
    orders = orders_collection.find()
    return jsonify([{"user_id": order["user_id"], "product_id": order["product_id"]} for order in orders])

@app.route('/place-order', methods=['POST'])
def place_order():
    data = request.json
    user_id = data['user_id']
    product_id = data['product_id']
    
    orders_collection.insert_one({"user_id": user_id, "product_id": product_id})
    return jsonify({"message": "Order placed successfully"}), 201

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5003)
