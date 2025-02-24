from flask import Flask, request, jsonify
from pymongo import MongoClient
import os

app = Flask(__name__)
client = MongoClient(os.getenv("MONGO_URI"))
db = client.ecommerce
products_collection = db.products

@app.route('/products', methods=['GET'])
def get_products():
    products = products_collection.find()
    return jsonify([{"name": product["name"], "price": product["price"]} for product in products])

@app.route('/add-product', methods=['POST'])
def add_product():
    data = request.json
    name = data['name']
    price = data['price']
    
    products_collection.insert_one({"name": name, "price": price})
    return jsonify({"message": "Product added successfully"}), 201

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5002)
