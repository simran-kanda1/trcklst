import React from 'react';
import ProductCard from './ProductCard';
import { ArrowRight } from 'lucide-react';
import './FeaturedProducts.css';

const FeaturedProducts = ({ products, onAddToCart }) => {
  const featuredProducts = products.slice(0, 6);

  return (
    <section className="featured-products">
      <div className="container">
        <div className="section-header">
          <div className="section-title-wrapper">
            <span className="section-subtitle">Latest Drops</span>
            <h2 className="section-title">
              <span className="gradient-text">Featured</span> Collection
            </h2>
            <p className="section-description">
              Exclusive artwork from the hottest artists albums in the music space
            </p>
          </div>
          <button className="view-all-btn">
            <span>View All</span>
            <ArrowRight size={20} />
          </button>
        </div>

        <div className="products-grid">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>

        <div className="section-footer">
          <button className="load-more-btn">
            Load More Artwork
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;