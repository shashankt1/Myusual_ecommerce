import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map(p => (
          <li key={p.name}>
            {p.name} - ${p.price} {' '}
            <Link to={`/product/${encodeURIComponent(p.name)}`}>View Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
