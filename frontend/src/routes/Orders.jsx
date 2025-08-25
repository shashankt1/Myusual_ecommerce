import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/orders`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then(res => {
      setOrders(res.data.data || []);
      setLoading(false);
    }).catch(() => {
      toast.error('Failed to load orders');
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <p className="text-center py-20">Loading your orders...</p>;
  }

  if (orders.length === 0) {
    return <p className="text-center py-20">You have no orders yet.</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-semibold">My Orders</h1>
      {orders.map(order => (
        <div key={order._id} className="border rounded-lg p-4 bg-white shadow">
          <h2 className="font-semibold mb-2">Order #{order._id}</h2>
          <p>Status: <span className="capitalize font-medium">{order.status}</span></p>
          <p>Total: ${order.total.toFixed(2)}</p>
          <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4">
            {order.items.map(item => (
              <div key={item.productId} className="flex items-center space-x-4 border p-2 rounded">
                <img src={item.imageURL} alt={item.name} className="w-16 h-16 object-cover rounded" />
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p>Qty: {item.qty}</p>
                  <p>${item.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
