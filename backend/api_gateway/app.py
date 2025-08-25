from flask import Flask, request, jsonify
import requests
from waitress import serve

app = Flask(__name__)

USER_SERVICE_URL = "http://user_service:5001"
PRODUCT_SERVICE_URL = "http://product_service:5002"
ORDER_SERVICE_URL = "http://order_service:5003"
AUTH_SERVICE_URL = "http://authentication_service:5004"
PAYMENT_SERVICE_URL = "http://payment_service:5005"

@app.route('/register', methods=['POST'])
def register_user():
    response = requests.post(f"{USER_SERVICE_URL}/register", json=request.json)
    return jsonify(response.json()), response.status_code

@app.route('/products', methods=['GET'])
def get_products():
    response = requests.get(f"{PRODUCT_SERVICE_URL}/products")
    return jsonify(response.json()), response.status_code

@app.route('/place-order', methods=['POST'])
def place_order():
    response = requests.post(f"{ORDER_SERVICE_URL}/place-order", json=request.json)
    return jsonify(response.json()), response.status_code

@app.route('/login', methods=['POST'])
def login_user():
    response = requests.post(f"{AUTH_SERVICE_URL}/login", json=request.json)
    return jsonify(response.json()), response.status_code

@app.route('/create-payment-intent', methods=['POST'])
def create_payment_intent():
    response = requests.post(f"{PAYMENT_SERVICE_URL}/create-payment-intent", json=request.json)
    return jsonify(response.json()), response.status_code

if __name__ == '__main__':
    serve(app, host='0.0.0.0', port=5000)