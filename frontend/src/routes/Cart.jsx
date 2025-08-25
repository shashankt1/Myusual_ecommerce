import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateItemQuantity, removeItem, clearCart } from '../store/slices/cartSlice';
import QuantityStepper from '../components/QuantityStepper';
import { Link, useNavigate } from 'react-router-dom';

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector(state => state.cart.items);
  const subtotal = useSelector(state => state.cart.subtotal);

  const handleQtyChange = (productId, quantity) => {
    dispatch(updateItemQuantity({ productId, quantity }));
  };

  const handleRemove = (productId) => {
    dispatch(removeItem(productId));
  };

  const handleClear = () => {
    dispatch(clearCart());
  };

  const handleCheckout = () => {
    if (items.length > 0) {
      navigate('/checkout');
    }
  };

  if (items.length === 0) {
    return (
      <div className="text-center p-10">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
        <Link to="/" className="text-accent hover:underline">Go back to shopping</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Shopping Cart</h1>
      <ul className="space-y-4">
        {items.map(item => (
          <li key={item.productId} className="flex items-center border-b border-gray-200 pb-4">
            <img
              src={item.imageURL}
              alt={item.name}
              className="w-20 h-20 object-cover rounded"
            />
            <div className="flex flex-col ml-4 flex-grow">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-gray-600">${item.price.toFixed(2)}</p>
              <QuantityStepper
                quantity={item.quantity}
                setQuantity={(qty) => handleQtyChange(item.productId, qty)}
                max={99}
              />
            </div>
            <button
              onClick={() => handleRemove(item.productId)}
              className="ml-4 text-red-600 hover:text-red-800 font-semibold"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={handleClear}
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded"
        >
          Clear Cart
        </button>
        <div className="text-xl font-semibold">
          Subtotal: ${subtotal.toFixed(2)}
        </div>
        <button
          onClick={handleCheckout}
          className="bg-accent hover:bg-accent/90 text-black font-semibold py-2 px-6 rounded"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
