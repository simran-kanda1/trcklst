import React from 'react';
import Hero from '../Hero';
import FeaturedProducts from '../FeaturedProducts';
import StatsSection from '../StatsSection';
import { products } from '../products';

const HomePage = () => {
  return (
    <div className="homepage">
      <Hero />
      <FeaturedProducts 
        products={products}
      />
      <StatsSection />
    </div>
  );
};

export default HomePage;