import React, { useState } from 'react';
import { ShoppingBag, Search, User, Menu, X, Music } from 'lucide-react';
import './Header.css';

const Header = ({ cartItemCount, scrollY }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <nav className={`header ${scrollY > 50 ? 'header-scrolled' : ''}`}>
        <div className="container">
          <div className="header-content">
            {/* Logo */}
            <div className="logo">
              <div className="logo-icon">
                <Music size={20} />
              </div>
              <span className="logo-text">TRCKLST</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="nav-desktop">
              <a href="#shop" className="nav-link">Shop</a>
              <a href="#artists" className="nav-link">Artists</a>
              <a href="#genres" className="nav-link">Genres</a>
              <a href="#about" className="nav-link">About</a>
            </div>
            
            {/* Desktop Actions */}
            <div className="actions-desktop">
              <button 
                className="action-btn"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search size={20} />
              </button>
              <button className="action-btn">
                <User size={20} />
              </button>
              <button className="cart-btn">
                <ShoppingBag size={20} />
                {cartItemCount > 0 && (
                  <span className="cart-badge">{cartItemCount}</span>
                )}
              </button>
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              className="mobile-menu-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="search-overlay">
          <div className="container">
            <div className="search-content">
              <input 
                type="text" 
                placeholder="Search artists, albums, posters..."
                className="search-input"
                autoFocus
              />
              <button 
                className="search-close"
                onClick={() => setIsSearchOpen(false)}
              >
                <X size={24} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-content">
            <a href="#shop" className="mobile-nav-link">Shop</a>
            <a href="#artists" className="mobile-nav-link">Artists</a>
            <a href="#genres" className="mobile-nav-link">Genres</a>
            <a href="#about" className="mobile-nav-link">About</a>
            <div className="mobile-actions">
              <button className="mobile-action-btn">
                <Search size={24} />
                <span>Search</span>
              </button>
              <button className="mobile-action-btn">
                <User size={24} />
                <span>Account</span>
              </button>
              <button className="mobile-action-btn">
                <ShoppingBag size={24} />
                <span>Cart ({cartItemCount})</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;