import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { clearCart } from '../store/slices/cartSlice';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector(state => state.cart.items);
  const subtotal = useSelector(state => state.cart.subtotal);
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  if (items.length === 0) {
    return (
      <div className="text-center p-10">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
        <button onClick={() => navigate('/')} className="text-accent hover:underline">Go shopping</button>
      </div>
    );
  }

  const createOrder = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/payments/create-order`,
        { amount: subtotal.toFixed(2), currency: "USD" }
      );
      return response.data.id; // PayPal Order ID
    } catch (error) {
      toast.error('Failed to create order');
      setLoading(false);
      throw error;
    }
  };

  const onApprove = async (data, actions) => {
    try {
      setLoading(true);
      const captureResponse = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/payments/capture/${data.orderID}`
      );
      // Clear cart and show success notification
      dispatch(clearCart());
      toast.success('Payment successful! Order placed.');
      navigate('/orders');
    } catch (error) {
      toast.error('Payment capture failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-3xl font-semibold mb-6">Checkout</h1>
      <label htmlFor="address" className="block mb-2 font-semibold">
        Shipping Address
      </label>
      <textarea
        id="address"
        placeholder="Enter your full shipping address"
        className="w-full border border-gray-300 p-3 rounded mb-6"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        rows={4}
      />
      <PayPalScriptProvider
        options={{ "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID, currency: "USD" }}
      >
        <PayPalButtons
          style={{ layout: 'vertical' }}
          createOrder={createOrder}
          onApprove={onApprove}
          forceReRender={[subtotal, address]}
          disabled={loading || !address.trim()}
        />
      </PayPalScriptProvider>
      {loading && <p className="mt-4 text-center text-green-600">Processing payment…</p>}
    </div>
  );
}
