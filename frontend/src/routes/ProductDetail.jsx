import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import QuantityStepper from '../components/QuantityStepper';
import { useDispatch } from 'react-redux';
import { addItem } from '../store/slices/cartSlice';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function ProductDetail() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/products/${productId}`)
      .then(res => {
        setProduct(res.data.data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        toast.error('Failed to load product.');
      });
  }, [productId]);

  const handleAddToCart = () => {
    dispatch(
      addItem({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity,
        imageURL: product.imageURL,
      })
    );
    toast.success('Added to cart');
  };

  if (loading) {
    return <p className="text-center py-20">Loading product...</p>;
  }

  if (!product) {
    return <p className="text-center py-20 text-red-600">Product not found.</p>;
  }

  return (
    <section className="max-w-5xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-8">
      <img
        src={product.imageURL}
        alt={product.name}
        className="object-cover w-full rounded-lg"
      />
      <div>
        <h1 className="text-3xl font-bold mb-4 font-sans">{product.name}</h1>
        <p className="text-xl text-accent font-semibold mb-4">${product.price.toFixed(2)}</p>
        <p className="mb-6 text-gray-700">{product.description}</p>
        <label className="block mb-2 font-medium text-gray-800">Quantity</label>
        <QuantityStepper quantity={quantity} setQuantity={setQuantity} max={product.inventory} />
        <button
          onClick={handleAddToCart}
          className="mt-6 bg-accent text-black font-semibold px-6 py-3 rounded shadow hover:bg-accent/90 transition"
        >
          Add to Cart
        </button>
      </div>
    </section>
  );
}
