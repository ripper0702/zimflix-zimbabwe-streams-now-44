
import React, { useRef } from 'react';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import ClipCard from './ClipCard';

interface Clip {
  id: string;
  title: string;
  thumbnail: string;
  author: string;
  likes: number;
  comments: number;
  views: string;
  duration: string;
  category: string;
}

interface ClipRowProps {
  title: string;
  clips: Clip[];
  onPlayClip: (clip: Clip) => void;
}

const ClipRow: React.FC<ClipRowProps> = ({ title, clips, onPlayClip }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320; // Width of clip card + gap
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="group relative mb-12 md:mb-16">
      {/* Section Title */}
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 sm:mb-8 px-4 sm:px-6">
        {title}
      </h2>

      {/* Clips Scroll Container */}
      <div className="relative">
        <div 
          ref={scrollRef}
          className="flex space-x-6 overflow-x-auto scrollbar-hide px-4 sm:px-6 pb-6 -mb-6"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {clips.map((clip) => (
            <ClipCard
              key={clip.id}
              clip={clip}
              onPlay={() => onPlayClip(clip)}
            />
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 ml-2 p-3 bg-black/50 hover:bg-black/70 backdrop-blur-xl border border-white/20 text-white rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 disabled:opacity-0 disabled:cursor-not-allowed"
          // disabled={!canScrollLeft}
        >
          <CaretLeft size={24} />
        </button>
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 mr-2 p-3 bg-black/50 hover:bg-black/70 backdrop-blur-xl border border-white/20 text-white rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 disabled:opacity-0 disabled:cursor-not-allowed"
          // disabled={!canScrollRight}
        >
          <CaretRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default ClipRow;
