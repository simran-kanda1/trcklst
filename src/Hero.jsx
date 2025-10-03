import React from 'react';
import { Play, ArrowRight, Volume2 } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      {/* Background Elements */}
      <div className="hero-bg">
        <div className="bg-gradient"></div>
        <div className="bg-orbs">
          <div className="orb orb-1 pulse-red"></div>
          <div className="orb orb-2 pulse-red"></div>
          <div className="orb orb-3 pulse-red"></div>
        </div>
        <div className="bg-grid"></div>
      </div>
      
      {/* Content */}
      <div className="container">
        <div className="hero-content">
          <div className="hero-badge">
            <Volume2 size={16} />
            <span>New Collection Available</span>
          </div>
          
          <h1 className="hero-title">
            <span className="hero-title-line">SONIC</span>
            <span className="hero-title-line gradient-text">ARTWORK</span>
            <span className="hero-title-line">FOR THE</span>
            <span className="hero-title-line gradient-text">DIGITAL AGE</span>
          </h1>
          
          <p className="hero-description">
            Discover exclusive music-inspired art, limited edition posters, 
            and digital collections from underground electronic artists worldwide.
          </p>
          
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">500+</span>
              <span className="stat-label">Artists</span>
            </div>
            <div className="stat">
              <span className="stat-number">2K+</span>
              <span className="stat-label">Artworks</span>
            </div>
            <div className="stat">
              <span className="stat-number">50K+</span>
              <span className="stat-label">Collectors</span>
            </div>
          </div>
          
          <div className="hero-actions">
            <button className="btn btn-primary">
              <span>Explore Collection</span>
              <ArrowRight size={20} />
            </button>
            
            <button className="btn btn-secondary">
              <Play size={20} />
              <span>Watch Showcase</span>
            </button>
          </div>
          
          <div className="hero-featured">
            <span className="featured-label">Featured Artist</span>
            <div className="featured-artist">
              <div className="artist-avatar">
                <img 
                  src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=60&h=60&fit=crop&crop=face" 
                  alt="Artist"
                />
              </div>
              <div className="artist-info">
                <span className="artist-name">Naraiyan</span>
                <span className="artist-track">Latest Drop: "Bestfriend"</span>
              </div>
              <div className="artist-play">
                <Play size={16} />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <div className="scroll-line"></div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
};

export default Hero;