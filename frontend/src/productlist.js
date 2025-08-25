import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5002/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <div>
      <h2>Product List</h2>
      {products.map(product => (
        <div key={product.product_id}>
          <h3>{product.name}</h3>
          <p>{product.price}</p>
          <Link to={`/product/${product.product_id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
