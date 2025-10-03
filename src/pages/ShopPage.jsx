import React, { useState, useEffect } from 'react';
import { Filter, Grid, List, Search, SlidersHorizontal } from 'lucide-react';
import ProductCard from '../ProductCard';
import { products, genres } from '../products';
import './ShopPage.css';

const ShopPage = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [filters, setFilters] = useState({
    genre: '',
    type: '',
    priceRange: '',
    sortBy: 'newest'
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.genre.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Genre filter
    if (filters.genre) {
      filtered = filtered.filter(product => product.genre === filters.genre);
    }

    // Type filter
    if (filters.type) {
      filtered = filtered.filter(product => product.type === filters.type);
    }

    // Price range filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(product => {
        if (max) {
          return product.price >= min && product.price <= max;
        } else {
          return product.price >= min;
        }
      });
    }

    // Sort products
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        filtered.sort((a, b) => parseInt(b.plays) - parseInt(a.plays));
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
        break;
    }

    setFilteredProducts(filtered);
  }, [filters, searchQuery]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      genre: '',
      type: '',
      priceRange: '',
      sortBy: 'newest'
    });
    setSearchQuery('');
  };

  return (
    <div className="shop-page">
      <div className="container">
        {/* Page Header */}
        <div className="shop-header">
          <div className="shop-title-section">
            <h1 className="shop-title">
              <span className="gradient-text">Explore</span> Collection
            </h1>
            <p className="shop-subtitle">
              Discover exclusive music artwork from talented electronic artists worldwide
            </p>
          </div>

          {/* Search Bar */}
          <div className="shop-search">
            <div className="search-input-wrapper">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Search artworks, artists, genres..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="shop-controls">
          <div className="controls-left">
            <button 
              className={`filter-toggle ${showFilters ? 'active' : ''}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal size={20} />
              <span>Filters</span>
            </button>
            
            <div className="results-count">
              {filteredProducts.length} artwork{filteredProducts.length !== 1 ? 's' : ''} found
            </div>
          </div>

          <div className="controls-right">
            <select 
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="sort-select"
            >
              <option value="newest">Newest First</option>
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>

            <div className="view-toggle">
              <button 
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <Grid size={20} />
              </button>
              <button 
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="filters-panel">
            <div className="filters-content">
              <div className="filter-group">
                <label className="filter-label">Genre</label>
                <select 
                  value={filters.genre}
                  onChange={(e) => handleFilterChange('genre', e.target.value)}
                  className="filter-select"
                >
                  <option value="">All Genres</option>
                  {genres.map(genre => (
                    <option key={genre} value={genre}>{genre}</option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label className="filter-label">Type</label>
                <select 
                  value={filters.type}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                  className="filter-select"
                >
                  <option value="">All Types</option>
                  <option value="digital">Digital</option>
                  <option value="poster">Poster</option>
                </select>
              </div>

              <div className="filter-group">
                <label className="filter-label">Price Range</label>
                <select 
                  value={filters.priceRange}
                  onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                  className="filter-select"
                >
                  <option value="">All Prices</option>
                  <option value="0-20">Under $20</option>
                  <option value="20-30">$20 - $30</option>
                  <option value="30-50">$30 - $50</option>
                  <option value="50">$50+</option>
                </select>
              </div>

              <button onClick={clearFilters} className="clear-filters-btn">
                Clear All Filters
              </button>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className={`products-container ${viewMode}`}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                viewMode={viewMode}
              />
            ))
          ) : (
            <div className="no-results">
              <div className="no-results-content">
                <h3>No artworks found</h3>
                <p>Try adjusting your filters or search terms</p>
                <button onClick={clearFilters} className="reset-btn">
                  Reset Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;