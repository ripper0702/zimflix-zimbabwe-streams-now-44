import React, { useState } from 'react';
import { Play, Heart, Share, Info, Plus, ChatCircle, ArrowSquareOut } from '@phosphor-icons/react';

interface FeaturedClipProps {
  clip: {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    author: string;
    likes: number;
    comments: number;
    views: string;
    category: string;
    youtubeUrl?: string;
  };
  onPlay: () => void;
}

const FeaturedClip: React.FC<FeaturedClipProps> = ({ clip, onPlay }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleWatchNow = () => {
    if (clip.youtubeUrl) {
      window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
    } else {
      onPlay();
    }
  };

  return (
    <div className="relative min-h-[50vh] sm:min-h-[60vh] md:min-h-[70vh] w-full overflow-hidden md:rounded-2xl md:mx-6 mb-12">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${clip.thumbnail})` }}
      />
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-6 sm:p-10 md:p-16">
        <div className="max-w-3xl">
          {/* Category Badge */}
          <div className="flex items-center space-x-3 mb-4">
            <div className="inline-block bg-gradient-to-r from-green-400/20 to-yellow-400/20 backdrop-blur-sm border border-white/20 text-white text-xs sm:text-sm px-3 py-1 rounded-full">
              🇿🇼 {clip.category}
            </div>
            {clip.youtubeUrl && (
              <div className="inline-block bg-red-600/20 backdrop-blur-sm border border-red-500/30 text-red-400 text-xs sm:text-sm px-3 py-1 rounded-full flex items-center gap-2">
                <ArrowSquareOut size={14} />
                <span>Watch on YouTube</span>
              </div>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
            {clip.title}
          </h1>

          {/* Author and Stats */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 text-white/80 mb-6">
            <span className="text-md sm:text-lg font-semibold">@{clip.author}</span>
            <div className="flex items-center space-x-4 text-xs sm:text-sm mt-2 sm:mt-0">
              <span>{clip.views} views</span>
              <span>•</span>
              <span>{clip.likes} likes</span>
              <span>•</span>
              <span>{clip.comments} comments</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-white/90 text-sm sm:text-lg mb-10 line-clamp-3 sm:line-clamp-4 max-w-2xl leading-relaxed">
            {clip.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button 
              onClick={handleWatchNow}
              className="flex items-center space-x-3 bg-white text-black px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-bold text-md sm:text-lg hover:bg-gray-200 transition-all duration-300 hover:scale-105 w-full sm:w-auto"
            >
              <Play size={24} weight="fill" />
              <span>{clip.youtubeUrl ? 'Watch on YouTube' : 'Watch Now'}</span>
            </button>

            <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-3 bg-gray-700/50 backdrop-blur-xl border border-white/20 text-white px-4 py-3 sm:px-6 sm:py-4 rounded-lg font-semibold hover:bg-gray-600/50 transition-all duration-300">
                <Info size={20} />
                <span className="hidden sm:inline">More Info</span>
              </button>

              <button 
                onClick={() => setIsLiked(!isLiked)}
                className={`p-3 sm:p-4 rounded-full backdrop-blur-xl border transition-all duration-300 ${
                  isLiked 
                    ? 'bg-red-500/20 border-red-500/30 text-red-500' 
                    : 'bg-black/20 border-white/10 text-white hover:bg-white/10'
                }`}
              >
                <Heart size={20} weight={isLiked ? "fill" : "regular"} />
              </button>

              <button className="p-3 sm:p-4 rounded-full bg-black/20 backdrop-blur-xl border border-white/10 text-white hover:bg-white/10 transition-all duration-300">
                <ChatCircle size={20} />
              </button>

              <button className="p-3 sm:p-4 rounded-full bg-black/20 backdrop-blur-xl border border-white/10 text-white hover:bg-white/10 transition-all duration-300">
                <Share size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedClip;
