import nav from './posterImages/nav.JPEG';
import theWeeknd from './posterImages/starboyPoster.JPEG';
import naraiyan from './posterImages/sincerely,naraiyan.JPEG';
import takeCare from './posterImages/takeCare.JPEG';
import theFirstTime from './posterImages/theFirstTime.JPEG';

export const products = [
    {
      id: 1,
      title: "NAV",
      artist: "NAV",
      price: 10.99,
      originalPrice: 39.99,
      type: "digital",
      genre: "Synthwave",
      image: nav,
      artistImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      likes: "3.2k",
      plays: "18.7k",
      description: "A vibrant exploration of cyberpunk aesthetics with pulsing neon colors",
      tags: ["cyberpunk", "neon", "retro", "electronic"],
      releaseDate: "2024-09-20",
      dimensions: "24x36 inches",
      limited: true,
      stock: 50
    },
    {
      id: 2,
      title: "Starboy",
      artist: "The Weeknd",
      price: 19.99,
      type: "digital",
      genre: "Dubstep",
      image: theWeeknd,
      artistImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      likes: "5.1k",
      plays: "32.4k",
      description: "Heavy bass frequencies visualized in stunning digital artwork",
      tags: ["bass", "frequency", "sound", "visualization"],
      releaseDate: "2024-09-18",
      resolution: "4K (3840x2160)",
      limited: false,
      stock: null
    },
    {
      id: 3,
      title: "Take Care",
      artist: "Drake",
      price: 34.99,
      type: "poster",
      genre: "Retrowave",
      image: takeCare,
      artistImage: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=40&h=40&fit=crop&crop=face",
      likes: "2.8k",
      plays: "14.2k",
      description: "80s nostalgia meets modern design in this retro masterpiece",
      tags: ["80s", "retro", "nostalgia", "synthwave"],
      releaseDate: "2024-09-15",
      dimensions: "18x24 inches",
      limited: true,
      stock: 25
    },
    {
      id: 4,
      title: "Sincerely, Naraiyan",
      artist: "Naraiyan",
      price: 24.99,
      type: "digital",
      genre: "Ambient",
      image: naraiyan,
      artistImage: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=40&h=40&fit=crop&crop=face",
      likes: "4.3k",
      plays: "21.8k",
      description: "Complex mathematical patterns rendered in ethereal digital beauty",
      tags: ["fractal", "mathematics", "digital", "abstract"],
      releaseDate: "2024-09-12",
      resolution: "8K (7680x4320)",
      limited: false,
      stock: null
    },
    {
      id: 5,
      title: "The First Time (DELUXE VERSION)",
      artist: "The Kid Laroi",
      price: 27.99,
      type: "poster",
      genre: "House",
      image: theFirstTime,
      artistImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
      likes: "1.9k",
      plays: "9.7k",
      description: "City lights and urban rhythms captured in striking visual form",
      tags: ["urban", "city", "lights", "rhythm"],
      releaseDate: "2024-09-10",
      dimensions: "20x30 inches",
      limited: true,
      stock: 75
    },
  ];
  
  export const genres = [
    "Synthwave",
    "Dubstep", 
    "Retrowave",
    "Ambient",
    "House",
    "Trance",
    "Minimal",
    "Glitch",
    "Techno",
    "Drum & Bass"
  ];
  
  export const artists = [
    {
      id: 1,
      name: "CYPHER",
      genre: "Synthwave",
      followers: "25.3k",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      verified: true
    },
    {
      id: 2,
      name: "VOLTAGE",
      genre: "Dubstep",
      followers: "41.7k",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
      verified: true
    },
    {
      id: 3,
      name: "NEON KNIGHT",
      genre: "Retrowave",
      followers: "18.9k",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop&crop=face",
      verified: false
    }
  ];