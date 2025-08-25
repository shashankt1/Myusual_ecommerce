import React, { useState } from 'react';

function Cart() {
  const [cart, setCart] = useState([]);

  const handleCheckout = () => {
    alert('Proceeding to checkout');
    // Logic to call order service and payment service can be added here
  };

  if (cart.length === 0) return <p>Your cart is empty.</p>;

  return (
    <div>
      <h2>Your Cart</h2>
      <ul>
        {cart.map((item, idx) => (
          <li key={idx}>
            {item.name} - ${item.price}
          </li>
        ))}
      </ul>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
}

export default Cart;