import React, { useEffect, useState } from 'react';
import ProductGrid from '../components/ProductGrid';
import BackgroundSection from '../components/BackgroundSection';
import axios from 'axios';

const HERO_IMAGE_URL = '/hero.jpg';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/products`)
      .then(res => {
        setProducts(res.data.data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      });
  }, []);

  return (
    <main>
      <BackgroundSection
        imageUrl={HERO_IMAGE_URL}
        overlayColor="rgba(0, 0, 0, 0.4)"
        title="Minimalist Streetwear & Sneakers"
        subtitle="Explore the latest in clean, modern street fashion."
        ctaText="Shop Now"
        ctaLink="/"
      />
      {loading ? (
        <p className="text-center py-20">Loading products …</p>
      ) : (
        <ProductGrid products={products} />
      )}
    </main>
  );
}