import React, { useState } from 'react';
import { ShoppingBag, Heart, Eye, Play, Download } from 'lucide-react';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product);
  };

  const handleToggleLike = () => {
    setIsLiked(!isLiked);
  };

  const getTypeIcon = () => {
    switch (product.type) {
      case 'digital':
        return <Download size={14} />;
      case 'poster':
        return <Eye size={14} />;
      default:
        return <Play size={14} />;
    }
  };

  return (
    <div 
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-inner">
        <div className="product-image-wrapper">
          <img 
            src={product.image} 
            alt={product.title}
            className="product-image"
          />
          
          {/* Overlay */}
          <div className={`product-overlay ${isHovered ? 'overlay-visible' : ''}`}>
            <div className="overlay-actions">
              <button className="overlay-btn" title="Quick View">
                <Eye size={20} />
              </button>
              <button 
                className={`overlay-btn ${isLiked ? 'btn-liked' : ''}`}
                onClick={handleToggleLike}
                title="Add to Wishlist"
              >
                <Heart size={20} />
              </button>
            </div>
          </div>

          {/* Type Badge */}
          <div className="product-type">
            {getTypeIcon()}
            <span>{product.type}</span>
          </div>

          {/* Artist Badge */}
          <div className="artist-badge">
            <div className="artist-avatar">
              <img 
                src={product.artistImage || "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=40&h=40&fit=crop&crop=face"} 
                alt={product.artist}
              />
            </div>
          </div>
        </div>

        <div className="product-info">
          <div className="product-header">
            <div>
              <h3 className="product-title">{product.title}</h3>
              <p className="product-artist">{product.artist}</p>
            </div>
            <div className="product-genre">
              {product.genre}
            </div>
          </div>

          <div className="product-meta">
            <div className="product-stats">
              <span className="stat">
                <Heart size={12} />
                {product.likes || '2.1k'}
              </span>
              <span className="stat">
                <Play size={12} />
                {product.plays || '15.3k'}
              </span>
            </div>
          </div>

          <div className="product-footer">
            <div className="price-wrapper">
              <span className="price">${product.price}</span>
              {product.originalPrice && (
                <span className="original-price">${product.originalPrice}</span>
              )}
            </div>
            
            <button 
              className="add-to-cart-btn"
              onClick={handleAddToCart}
            >
              <ShoppingBag size={16} />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>

      {/* Card Glow Effect */}
      <div className="card-glow"></div>
    </div>
  );
};

export default ProductCard;