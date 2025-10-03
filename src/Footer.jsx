import React from 'react';
import { Music, Instagram, Twitter, Youtube, Mail, MapPin, Phone } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-bg">
        <div className="bg-grid-footer"></div>
        <div className="footer-glow"></div>
      </div>
      
      <div className="container">
        <div className="footer-content">
          {/* Main Footer */}
          <div className="footer-main">
            <div className="footer-brand">
              <div className="footer-logo">
                <div className="logo-icon">
                  <Music size={24} />
                </div>
                <span className="logo-text">TRCKLST</span>
              </div>
              <p className="footer-description">
                The ultimate destination for electronic music artwork. 
                Discover, collect, and support artists from around the globe.
              </p>
              <div className="social-links">
                <a href="#" className="social-link" aria-label="Instagram">
                  <Instagram size={20} />
                </a>
                <a href="#" className="social-link" aria-label="Twitter">
                  <Twitter size={20} />
                </a>
                <a href="#" className="social-link" aria-label="YouTube">
                  <Youtube size={20} />
                </a>
                <a href="#" className="social-link" aria-label="Email">
                  <Mail size={20} />
                </a>
              </div>
            </div>

            <div className="footer-links">
              <div className="link-group">
                <h3 className="link-group-title">Shop</h3>
                <ul className="link-list">
                  <li><a href="#" className="footer-link">New Releases</a></li>
                  <li><a href="#" className="footer-link">Digital Art</a></li>
                  <li><a href="#" className="footer-link">Posters</a></li>
                  <li><a href="#" className="footer-link">Limited Editions</a></li>
                  <li><a href="#" className="footer-link">Sale</a></li>
                </ul>
              </div>

              <div className="link-group">
                <h3 className="link-group-title">Artists</h3>
                <ul className="link-list">
                  <li><a href="#" className="footer-link">Featured Artists</a></li>
                  <li><a href="#" className="footer-link">Submit Artwork</a></li>
                  <li><a href="#" className="footer-link">Artist Guidelines</a></li>
                  <li><a href="#" className="footer-link">Collaboration</a></li>
                  <li><a href="#" className="footer-link">Artist Resources</a></li>
                </ul>
              </div>

              <div className="link-group">
                <h3 className="link-group-title">Support</h3>
                <ul className="link-list">
                  <li><a href="#" className="footer-link">Help Center</a></li>
                  <li><a href="#" className="footer-link">Contact Us</a></li>
                  <li><a href="#" className="footer-link">Shipping Info</a></li>
                  <li><a href="#" className="footer-link">Returns</a></li>
                  <li><a href="#" className="footer-link">Size Guide</a></li>
                </ul>
              </div>

              <div className="link-group">
                <h3 className="link-group-title">Newsletter</h3>
                <p className="newsletter-description">
                  Get notified about new releases, exclusive drops, and artist features.
                </p>
                <form className="newsletter-form">
                  <div className="newsletter-input-wrapper">
                    <input 
                      type="email" 
                      placeholder="Enter your email"
                      className="newsletter-input"
                    />
                    <button type="submit" className="newsletter-btn">
                      Subscribe
                    </button>
                  </div>
                </form>
                <p className="newsletter-privacy">
                  We respect your privacy. Unsubscribe anytime.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="footer-contact">
            <div className="contact-item">
              <MapPin size={16} />
              <span>Toronto, ON</span>
            </div>
            <div className="contact-item">
              <Mail size={16} />
              <span>hello@trcklst.com</span>
            </div>
            <div className="contact-item">
              <Phone size={16} />
              <span>+1 (647) 980 8256</span>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="footer-bottom">
            <div className="footer-bottom-left">
              <p className="copyright">
                © 2025 TRCKLST. All rights reserved.
              </p>
            </div>
            <div className="footer-bottom-right">
              <a href="#" className="footer-legal-link">Privacy Policy</a>
              <a href="#" className="footer-legal-link">Terms of Service</a>
              <a href="#" className="footer-legal-link">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;