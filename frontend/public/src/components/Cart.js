import React, { useState } from 'react';

function Cart() {
  const [cart, setCart] = useState([]);

  const handleCheckout = () => {
    // Call the Order service and Payment service to complete the purchase
    alert('Proceeding to checkout');
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map(item => (
            <div key={item.id}>
              <p>{item.name}</p>
              <p>{item.price}</p>
            </div>
          ))}
          <button onClick={handleCheckout}>Checkout</button>
        </div>
      )}
    </div>
  );
}

export default Cart;
