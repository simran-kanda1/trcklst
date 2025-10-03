import React, { useState, useEffect } from 'react';
import { Music } from 'lucide-react';
import './LoadingAnimation.css';

const LoadingAnimation = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          setIsComplete(true);
          setTimeout(() => {
            onComplete();
          }, 800);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(progressTimer);
  }, [onComplete]);

  return (
    <div className={`loading-screen ${isComplete ? 'loading-complete' : ''}`}>
      {/* Background */}
      <div className="loading-bg">
        <div className="loading-orb loading-orb-1"></div>
        <div className="loading-orb loading-orb-2"></div>
        <div className="loading-orb loading-orb-3"></div>
      </div>

      {/* Content */}
      <div className="loading-content">
        {/* Logo */}
        <div className="loading-logo">
          <div className="loading-logo-icon">
            <Music size={32} />
          </div>
          <span className="loading-logo-text">TRCKLST</span>
        </div>

        {/* Sound Wave Animation */}
        <div className="sound-wave">
          {[...Array(12)].map((_, i) => (
            <div 
              key={i} 
              className="wave-bar" 
              style={{ animationDelay: `${i * 0.1}s` }}
            ></div>
          ))}
        </div>

        {/* Progress */}
        <div className="loading-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="progress-text">
            <span className="progress-percentage">{progress}%</span>
            <span className="progress-label">Loading Experience</span>
          </div>
        </div>

        {/* Squiggly Lines */}
        <svg className="squiggly-lines" viewBox="0 0 400 100">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#dc2626" />
              <stop offset="50%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#f87171" />
            </linearGradient>
          </defs>
          
          <path
            className="squiggly-path"
            d="M0,50 Q50,20 100,50 T200,50 T300,50 T400,50"
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          
          <path
            className="squiggly-path squiggly-path-2"
            d="M0,60 Q40,30 80,60 T160,60 T240,60 T320,60 T400,60"
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.6"
          />
        </svg>

        {/* Loading Text */}
        <div className="loading-messages">
          <div className="loading-message">
            {progress < 25 && "Tuning the frequencies..."}
            {progress >= 25 && progress < 50 && "Mixing the perfect beat..."}
            {progress >= 50 && progress < 75 && "Dropping the bass..."}
            {progress >= 75 && progress < 100 && "Almost ready to drop..."}
            {progress >= 100 && "Welcome to TRCKLST"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;