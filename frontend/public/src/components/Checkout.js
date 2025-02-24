import React, { useState } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('your_stripe_public_key');

function Checkout() {
  const [amount, setAmount] = useState(1000); // $10

  const handlePayment = async () => {
    const stripe = await stripePromise;

    const response = await axios.post('http://localhost:5000/create-payment-intent', { amount });

    const { client_secret } = response.data;

    const result = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: cardElement, // Stripe.js element
      },
    });

    if (result.error) {
      console.log(result.error.message);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        alert('Payment successful');
      }
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
}

export default Checkout;
