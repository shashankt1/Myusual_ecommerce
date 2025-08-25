import React from 'react';

export default function QuantityStepper({ quantity, setQuantity, max = 99 }) {
  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increment = () => {
    if (quantity < max) {
      setQuantity(quantity + 1);
    }
  };

  const onChange = (e) => {
    let val = parseInt(e.target.value);
    if (isNaN(val) || val < 1) {
      val = 1;
    } else if (val > max) {
      val = max;
    }
    setQuantity(val);
  };

  return (
    <div className="inline-flex items-center border border-gray-300 rounded-md overflow-hidden">
      <button
        aria-label="Decrease quantity"
        onClick={decrement}
        className="w-8 h-8 flex justify-center items-center bg-gray-100 hover:bg-gray-200"
      >
        -
      </button>
      <input
        type="number"
        aria-label="Quantity"
        className="w-12 text-center border-none outline-none"
        value={quantity}
        onChange={onChange}
        min={1}
        max={max}
      />
      <button
        aria-label="Increase quantity"
        onClick={increment}
        className="w-8 h-8 flex justify-center items-center bg-gray-100 hover:bg-gray-200"
      >
        +
      </button>
    </div>
  );
}
