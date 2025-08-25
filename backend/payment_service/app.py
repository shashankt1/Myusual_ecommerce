from flask import Flask, request, jsonify
import os
import requests
from requests.auth import HTTPBasicAuth
from waitress import serve

app = Flask(__name__)

PAYPAL_CLIENT_ID = os.getenv("AZ3PqPgDlCAO88_R6JvwFIOlRvMwXEK9UdhxN_A3DtVF7igE8wS2OcldFlz6lam0ZWwP2kIXixIN6GZ7")
PAYPAL_SECRET = os.getenv("ELnQGJPePX62cFfUhYFAH4_tHZSngr0F4rZufvfLcuk8b0NXEHU0nIehB03NIYRD49CT9J4ZDA1-V8tV")
PAYPAL_API_BASE = "https://api-m.sandbox.paypal.com" 

def get_access_token():
    url = f"{PAYPAL_API_BASE}/v1/oauth2/token"
    headers = {"Accept": "application/json", "Accept-Language": "en_US"}
    data = {"grant_type": "client_credentials"}

    response = requests.post(url, headers=headers, data=data,
                             auth=HTTPBasicAuth(PAYPAL_CLIENT_ID, PAYPAL_SECRET))
    response.raise_for_status()
    token = response.json().get("access_token")
    return token

@app.route('/create-payment', methods=['POST'])
def create_payment():
    data = request.json
    amount = data.get("amount")
    currency = data.get("currency", "USD")

    if not amount:
        return jsonify({"error": "Amount is required"}), 400

    try:
        access_token = get_access_token()
    except Exception as e:
        return jsonify({"error": f"Failed to get access token: {str(e)}"}), 500

    payment_url = f"{PAYPAL_API_BASE}/v2/checkout/orders"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {access_token}"
    }

    order_data = {
        "intent": "CAPTURE",
        "purchase_units": [{
            "amount": {
                "currency_code": currency,
                "value": f"{amount:.2f}"
            }
        }],
        "application_context": {
            "return_url": "https://your-return-url.com/return",
            "cancel_url": "https://your-cancel-url.com/cancel"
        }
    }

    try:
        response = requests.post(payment_url, json=order_data, headers=headers)
        response.raise_for_status()
        order = response.json()

        # Extract approval link for redirecting customer
        approval_link = None
        for link in order.get("links", []):
            if link.get("rel") == "approve":
                approval_link = link.get("href")
                break

        return jsonify({
            "orderID": order.get("id"),
            "approvalUrl": approval_link
        })
    except Exception as e:
        return jsonify({"error": f"Failed to create PayPal order: {str(e)}"}), 500

if __name__ == '__main__':
    serve(app, host='0.0.0.0', port=5006)