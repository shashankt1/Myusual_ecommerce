from flask import Flask, request, jsonify
from pymongo import MongoClient
import os
from waitress import serve

app = Flask(__name__)

mongo_uri = os.getenv("MONGO_URI", "mongodb://mongo:27017/ecommerce")
client = MongoClient(mongo_uri)
db = client.ecommerce
products_collection = db.products

@app.route('/products', methods=['GET'])
def get_products():
    products = list(products_collection.find({}, {"_id": 0}))
    return jsonify(products), 200

@app.route('/add-product', methods=['POST'])
def add_product():
    data = request.json
    name = data.get('name')
    price = data.get('price')

    if not name or price is None:
        return jsonify({"message": "Product name and price are required"}), 400

    products_collection.insert_one({"name": name, "price": price})
    return jsonify({"message": "Product added successfully"}), 201

if __name__ == '__main__':
    serve(app, host='0.0.0.0', port=5002)
