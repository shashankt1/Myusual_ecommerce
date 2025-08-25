import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: '',
    slug: '',
    description: '',
    price: '',
    imageURL: '',
    category: '',
    inventory: '',
  });
  const [loading, setLoading] = useState(false);

  // Fetch products on load
  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/products`);
      setProducts(res.data.data);
    } catch {
      toast.error('Failed to load products');
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/products`, form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      toast.success('Product created!');
      setForm({ name: '', slug: '', description: '', price: '', imageURL: '', category: '', inventory: '' });
      fetchProducts();
    } catch (error) {
      toast.error('Failed to create product');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Admin Dashboard</h1>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8" onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          className="p-3 border rounded"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="slug"
          placeholder="Slug (unique)"
          className="p-3 border rounded"
          value={form.slug}
          onChange={handleChange}
          required
        />
        <input
          name="description"
          placeholder="Description"
          className="p-3 border rounded"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          className="p-3 border rounded"
          value={form.price}
          onChange={handleChange}
          required
        />
        <input
          name="imageURL"
          placeholder="Image URL"
          className="p-3 border rounded"
          value={form.imageURL}
          onChange={handleChange}
          required
        />
        <input
          name="category"
          placeholder="Category"
          className="p-3 border rounded"
          value={form.category}
          onChange={handleChange}
          required
        />
        <input
          name="inventory"
          type="number"
          placeholder="Inventory"
          className="p-3 border rounded"
          value={form.inventory}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="col-span-full bg-accent text-black py-3 rounded hover:bg-accent/90 font-semibold transition"
        >
          {loading ? 'Saving...' : 'Add/Update Product'}
        </button>
      </form>

      <h2 className="text-2xl font-semibold mb-4">Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map(p => (
          <div key={p._id} className="border p-4 rounded shadow flex flex-col">
            <img src={p.imageURL} alt={p.name} className="h-40 object-cover rounded mb-4" />
            <h3 className="font-semibold text-lg">{p.name}</h3>
            <p className="mb-2 text-gray-600">${p.price.toFixed(2)}</p>
            <p className="mb-2 text-gray-500">Category: {p.category}</p>
            <p className="mb-4 text-gray-500">Inventory: {p.inventory}</p>
            {/* Update and delete buttons could go here in future */}
          </div>
        ))}
      </div>
    </div>
  );
}
