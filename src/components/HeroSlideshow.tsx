"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { IMAGES } from '@/lib/constants';

const images = IMAGES.heroSlideshow;

export default function HeroSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<Set<number>>(new Set());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef<NodeJS.Timeout | null>(null);


  const SLIDE_DURATION = 5000; // 5 seconds
  const PROGRESS_INTERVAL = 50; // Update progress every 50ms

  const goToPrevious = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
    setProgress(0);
  }, []);

  const goToNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
    setProgress(0);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
    setProgress(0);
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

  // Auto-advance slides with progress tracking
  useEffect(() => {
    if (!isPlaying || isHovered) return;

    // Clear existing intervals
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (progressRef.current) clearInterval(progressRef.current);

    // Reset progress
    setProgress(0);

    // Progress update interval
    progressRef.current = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + (PROGRESS_INTERVAL / SLIDE_DURATION) * 100;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, PROGRESS_INTERVAL);

    // Slide change interval
    intervalRef.current = setInterval(() => {
      goToNext();
    }, SLIDE_DURATION);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
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
        className="absolute left-8 top-1/2 -translate-y-1/2 bg-white/5 hover:bg-white/10 backdrop-blur-xl text-white p-4 rounded-full transition-all duration-500 opacity-0 group-hover:opacity-100 hover:scale-110 border border-white/10 z-30"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button
        onClick={goToNext}
        className="absolute right-8 top-1/2 -translate-y-1/2 bg-white/5 hover:bg-white/10 backdrop-blur-xl text-white p-4 rounded-full transition-all duration-500 opacity-0 group-hover:opacity-100 hover:scale-110 border border-white/10 z-30"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
      
      {/* Elegant dots indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30">
        <div className="flex space-x-4">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative transition-all duration-500 ${
                index === currentSlide 
                  ? 'w-12 h-1 bg-white rounded-full' 
                  : 'w-1 h-1 bg-white/40 hover:bg-white/70 rounded-full'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            >
              {/* Smooth progress bar */}
              {index === currentSlide && (
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full transition-all duration-100 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}