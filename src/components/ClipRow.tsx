
import React, { useRef } from 'react';
import { CaretLeft, CaretRight } from 'phosphor-react';
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
    <div className="relative mb-12">
      {/* Section Title */}
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 px-6">
        {title}
      </h2>

      {/* Navigation Buttons */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
        <button
          onClick={() => scroll('left')}
          className="ml-2 p-3 bg-black/50 hover:bg-black/70 backdrop-blur-xl border border-white/20 text-white rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
        >
          <CaretLeft size={24} />
        </button>
      </div>

      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10">
        <button
          onClick={() => scroll('right')}
          className="mr-2 p-3 bg-black/50 hover:bg-black/70 backdrop-blur-xl border border-white/20 text-white rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
        >
          <CaretRight size={24} />
        </button>
      </div>

      {/* Clips Scroll Container */}
      <div className="group relative">
        <div 
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide px-6 pb-4"
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
      </div>
    </div>
  );
};

export default ClipRow;
