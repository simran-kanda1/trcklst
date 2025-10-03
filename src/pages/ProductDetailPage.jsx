import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Heart, 
  Share2,
  Download,
  Eye,
  Play,
  Star,
  ArrowLeft,
  Calendar,
  Tag,
  User,
  Palette
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import ProductCard from '../ProductCard';
import { products } from '../products';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, isInCart, getItemQuantity } = useCart();
  
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    // Find product by ID
    const foundProduct = products.find(p => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
      
      // Find related products (same genre or artist)
      const related = products
        .filter(p => 
          p.id !== foundProduct.id && 
          (p.genre === foundProduct.genre || p.artist === foundProduct.artist)
        )
        .slice(0, 4);
      setRelatedProducts(related);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="product-detail-page">
        <div className="container">
          <div className="product-not-found">
            <h1>Product not found</h1>
            <button onClick={() => navigate('/shop')} className="back-to-shop-btn">
              Back to Shop
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          text: `Check out this awesome artwork by ${product.artist}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const getTypeIcon = () => {
    switch (product.type) {
      case 'digital':
        return <Download size={20} />;
      case 'poster':
        return <Eye size={20} />;
      default:
        return <Play size={20} />;
    }
  };

  return (
    <div className="product-detail-page">
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <button onClick={() => navigate('/shop')} className="back-btn">
            <ArrowLeft size={20} />
            <span>Back to Shop</span>
          </button>
        </div>

        {/* Product Main */}
        <div className="product-main">
          {/* Product Images */}
          <div className="product-images">
            <div className="main-image">
              <img 
                src={product.image} 
                alt={product.title}
                className="product-image"
              />
              <div className="image-overlay">
                <div className="zoom-btn">
                  <Eye size={24} />
                </div>
              </div>
            </div>
            
            {/* Image thumbnails would go here if we had multiple images */}
          </div>

          {/* Product Info */}
          <div className="product-info">
            <div className="product-header">
              <div className="product-badges">
                <span className="type-badge">
                  {getTypeIcon()}
                  {product.type}
                </span>
                {product.limited && (
                  <span className="limited-badge">Limited Edition</span>
                )}
              </div>

              <h1 className="product-title">{product.title}</h1>
              
              <div className="artist-info">
                <div className="artist-avatar">
                  <img 
                    src={product.artistImage} 
                    alt={product.artist}
                  />
                </div>
                <div className="artist-details">
                  <span className="artist-name">{product.artist}</span>
                  <span className="artist-genre">{product.genre}</span>
                </div>
              </div>

              <div className="product-stats">
                <div className="stat">
                  <Heart size={16} />
                  <span>{product.likes}</span>
                </div>
                <div className="stat">
                  <Play size={16} />
                  <span>{product.plays}</span>
                </div>
                <div className="stat">
                  <Star size={16} />
                  <span>4.8</span>
                </div>
              </div>
            </div>

            <div className="product-pricing">
              <div className="price-section">
                <span className="current-price">${product.price}</span>
                {product.originalPrice && (
                  <span className="original-price">${product.originalPrice}</span>
                )}
              </div>

              {product.stock && (
                <div className="stock-info">
                  <span className="stock-text">
                    {product.stock} left in stock
                  </span>
                </div>
              )}
            </div>

            <div className="product-actions">
              <div className="quantity-selector">
                <label>Quantity</label>
                <div className="quantity-controls">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)}>
                    +
                  </button>
                </div>
              </div>

              <button 
                onClick={handleAddToCart}
                className="add-to-cart-btn primary"
              >
                <ShoppingBag size={20} />
                Add to Cart - ${(product.price * quantity).toFixed(2)}
              </button>

              <div className="secondary-actions">
                <button 
                  onClick={handleWishlistToggle}
                  className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
                >
                  <Heart size={20} />
                </button>
                <button onClick={handleShare} className="share-btn">
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            <div className="product-features">
              <div className="feature">
                <Calendar size={16} />
                <span>Released {new Date(product.releaseDate).toLocaleDateString()}</span>
              </div>
              {product.type === 'digital' && (
                <>
                  <div className="feature">
                    <Download size={16} />
                    <span>Instant download</span>
                  </div>
                  <div className="feature">
                    <Palette size={16} />
                    <span>High resolution files</span>
                  </div>
                </>
              )}
              {product.type === 'poster' && (
                <div className="feature">
                  <Tag size={16} />
                  <span>{product.dimensions}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="product-details">
          <div className="tabs-header">
            <button 
              className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button 
              className={`tab-btn ${activeTab === 'specifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('specifications')}
            >
              Specifications
            </button>
            <button 
              className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews (24)
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'description' && (
              <div className="description-content">
                <p>{product.description}</p>
                <div className="tags">
                  {product.tags?.map(tag => (
                    <span key={tag} className="tag">#{tag}</span>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="specs-content">
                <div className="spec-row">
                  <span className="spec-label">Type:</span>
                  <span className="spec-value">{product.type}</span>
                </div>
                <div className="spec-row">
                  <span className="spec-label">Genre:</span>
                  <span className="spec-value">{product.genre}</span>
                </div>
                {product.type === 'digital' && (
                  <>
                    <div className="spec-row">
                      <span className="spec-label">Resolution:</span>
                      <span className="spec-value">{product.resolution}</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-label">File Formats:</span>
                      <span className="spec-value">JPG, PNG, PDF</span>
                    </div>
                  </>
                )}
                {product.type === 'poster' && (
                  <>
                    <div className="spec-row">
                      <span className="spec-label">Dimensions:</span>
                      <span className="spec-value">{product.dimensions}</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-label">Material:</span>
                      <span className="spec-value">Premium paper</span>
                    </div>
                  </>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="reviews-content">
                <p>Reviews coming soon...</p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="related-products">
            <h2 className="section-title">
              <span className="gradient-text">Related</span> Artworks
            </h2>
            <div className="related-grid">
              {relatedProducts.map(relatedProduct => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;