import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/product/${product.slug}`}>
        <img
          src={product.imageURL}
          alt={product.name}
          className="h-56 w-full object-cover"
          loading="lazy"
        />
      </Link>
      <div className="p-4">
        <Link to={`/product/${product.slug}`}>
          <h3 className="text-lg font-semibold text-gray-900 hover:text-accent">{product.name}</h3>
        </Link>
        <p className="mt-1 text-sm text-gray-600">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
}
