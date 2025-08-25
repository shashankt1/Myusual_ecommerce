import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/products')
      .then(response => {
        const prod = response.data.find(p => p.name === productId);
        if (prod) {
          setProduct(prod);
        } else {
          setError("Product not found");
        }
      })
      .catch(() => setError("Error fetching product"));
  }, [productId]);

  if (error) return <p>{error}</p>;
  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <h2>{product.name}</h2>
      <p><strong>Price:</strong> ${product.price}</p>
    </div>
  );
}

export default ProductDetails;
