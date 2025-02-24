import stripe
from flask import Flask, request, jsonify
import os

app = Flask(__name__)

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

@app.route('/create-payment-intent', methods=['POST'])
def create_payment_intent():
    data = request.json
    amount = data.get("amount")  # Amount in cents (e.g., $10 = 1000 cents)

    try:
        # Create a PaymentIntent with the amount and currency
        intent = stripe.PaymentIntent.create(
            amount=amount,
            currency='usd',
            metadata={'integration_check': 'accept_a_payment'},
        )
        return jsonify({'client_secret': intent.client_secret})
    except Exception as e:
        return jsonify(error=str(e)), 400

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5005)
