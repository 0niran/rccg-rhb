"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { IMAGES } from '@/lib/constants';

const images = IMAGES.heroSlideshow;

export default function HeroSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState<Set<number>>(new Set());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);


  const SLIDE_DURATION = 5000; // 5 seconds
  const PROGRESS_INTERVAL = 50; // Update progress every 50ms

  const goToPrevious = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  }, []);

  const goToNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  }, []);

  const togglePlayPause = useCallback(() => {
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        goToPrevious();
      } else if (event.key === 'ArrowRight') {
        goToNext();
      } else if (event.key === ' ') {
        event.preventDefault();
        togglePlayPause();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPrevious, goToNext, togglePlayPause]);

  // Auto-advance slides
  useEffect(() => {
    if (!isPlaying || isHovered) return;

    // Clear existing interval
    if (intervalRef.current) clearInterval(intervalRef.current);

    // Slide change interval
    intervalRef.current = setInterval(() => {
      goToNext();
    }, SLIDE_DURATION);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, isHovered, currentSlide, goToNext]);

  // Preload images
  useEffect(() => {
    images.forEach((src, index) => {
      const img = new window.Image();
      img.onload = () => {
        setImagesLoaded(prev => new Set(prev).add(index));
      };
      img.src = src;
    });
  }, []);

  const handleImageLoad = (index: number) => {
    setImagesLoaded(prev => new Set(prev).add(index));
  };


  return (
    <div 
      className="absolute inset-0 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Images with loading states */}
      {images.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentSlide 
              ? 'opacity-100 scale-100' 
              : 'opacity-0 scale-105'
          }`}
        >
          {/* Loading skeleton */}
          {!imagesLoaded.has(index) && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse" />
          )}
          
          <Image
            src={src}
            alt={`Church community ${index + 1}`}
            fill
            className={`object-cover transition-transform duration-1000 ${
              index === 1 || index === 3 
                ? 'object-[center_40%]' 
                : 'object-center'
            }`}
            priority={index === 0}
            onLoad={() => handleImageLoad(index)}
          />
        </div>
      ))}
      
      {/* Sophisticated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/60"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40"></div>
      
      {/* Minimalist navigation arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 bg-white/5 hover:bg-white/10 backdrop-blur-xl text-white p-3 sm:p-4 rounded-full transition-all duration-500 opacity-60 sm:opacity-0 sm:group-hover:opacity-100 hover:scale-110 border border-white/10 z-30"
        aria-label="Previous image"
      >
        <ChevronLeftIcon className="w-6 h-6" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 bg-white/5 hover:bg-white/10 backdrop-blur-xl text-white p-3 sm:p-4 rounded-full transition-all duration-500 opacity-60 sm:opacity-0 sm:group-hover:opacity-100 hover:scale-110 border border-white/10 z-30"
        aria-label="Next image"
      >
        <ChevronRightIcon className="w-6 h-6" />
      </button>
      
    </div>
  );
}