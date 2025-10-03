import React, { useState, useEffect, useRef } from 'react';
import { Music, Users, Download, Star } from 'lucide-react';
import './StatsSection.css';

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({
    artists: 0,
    artworks: 0,
    downloads: 0,
    rating: 0
  });
  
  const sectionRef = useRef(null);

  const stats = [
    {
      icon: Music,
      label: 'Featured Artists',
      value: 500,
      suffix: '+',
      color: 'text-red-400'
    },
    {
      icon: Star,
      label: 'Artworks Created',
      value: 2500,
      suffix: '+',
      color: 'text-red-500'
    },
    {
      icon: Download,
      label: 'Total Downloads',
      value: 75000,
      suffix: '+',
      color: 'text-red-400'
    },
    {
      icon: Users,
      label: 'Happy Collectors',
      value: 50000,
      suffix: '+',
      color: 'text-red-500'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    stats.forEach((stat, index) => {
      let currentStep = 0;
      const increment = stat.value / steps;

      const timer = setInterval(() => {
        currentStep++;
        const currentValue = Math.min(Math.floor(increment * currentStep), stat.value);
        
        setCounters(prev => ({
          ...prev,
          [stat.label.toLowerCase().replace(' ', '_')]: currentValue
        }));

        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, stepDuration + (index * 100)); // Stagger the animations

      return () => clearInterval(timer);
    });
  }, [isVisible]);

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(num >= 10000 ? 0 : 1) + 'k';
    }
    return num.toString();
  };

  return (
    <section className="stats-section" ref={sectionRef}>
      <div className="stats-bg">
        <div className="bg-pattern"></div>
        <div className="bg-glow-left"></div>
        <div className="bg-glow-right"></div>
      </div>
      
      <div className="container">
        <div className="stats-content">
          <div className="stats-header">
            <h2 className="stats-title">
              Trusted by the <span className="gradient-text">Global</span> Community
            </h2>
            <p className="stats-description">
              Join thousands of music lovers and collectors in the ultimate destination 
              for electronic music artwork
            </p>
          </div>

          <div className="stats-grid">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              const key = stat.label.toLowerCase().replace(' ', '_');
              const currentValue = counters[key] || 0;
              
              return (
                <div key={stat.label} className="stat-card">
                  <div className="stat-icon-wrapper">
                    <div className="stat-icon">
                      <Icon size={24} />
                    </div>
                  </div>
                  
                  <div className="stat-content">
                    <div className="stat-number">
                      {formatNumber(currentValue)}
                      <span className="stat-suffix">{stat.suffix}</span>
                    </div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                  
                  <div className="stat-glow"></div>
                </div>
              );
            })}
          </div>

          <div className="stats-footer">
            <div className="testimonial">
              <div className="testimonial-content">
                <p className="testimonial-text">
                  "TRCKLST has completely transformed how I discover and collect 
                  electronic music artwork. The quality and variety is unmatched."
                </p>
                <div className="testimonial-author">
                  <div className="author-avatar">
                    <img 
                      src="https://images.unsplash.com/photo-1494790108755-2616c19aa37d?w=60&h=60&fit=crop&crop=face" 
                      alt="Sarah Chen"
                    />
                  </div>
                  <div className="author-info">
                    <div className="author-name">Sarah Chen</div>
                    <div className="author-title">Digital Art Collector</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;