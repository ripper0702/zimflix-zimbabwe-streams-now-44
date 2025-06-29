
import React, { useState } from 'react';
import { Play, Heart, ChatCircle, Share, Info } from 'phosphor-react';

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
  };
  onPlay: () => void;
}

const FeaturedClip: React.FC<FeaturedClipProps> = ({ clip, onPlay }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="relative h-[70vh] w-full overflow-hidden rounded-2xl mx-6 mb-12">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${clip.thumbnail})` }}
      />
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-8 md:p-12">
        <div className="max-w-2xl">
          {/* Category Badge */}
          <div className="inline-block bg-gradient-to-r from-green-400/20 to-yellow-400/20 backdrop-blur-sm border border-white/20 text-white text-sm px-3 py-1 rounded-full mb-4">
            {clip.category}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
            {clip.title}
          </h1>

          {/* Author and Stats */}
          <div className="flex items-center space-x-6 text-white/80 mb-4">
            <span className="text-lg font-semibold">@{clip.author}</span>
            <div className="flex items-center space-x-4 text-sm">
              <span>{clip.views} views</span>
              <span>•</span>
              <span>{clip.likes} likes</span>
              <span>•</span>
              <span>{clip.comments} comments</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-white/90 text-lg mb-8 line-clamp-3 max-w-xl">
            {clip.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center space-x-4">
            <button 
              onClick={onPlay}
              className="flex items-center space-x-3 bg-white text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-200 transition-all duration-300 hover:scale-105"
            >
              <Play size={24} weight="fill" />
              <span>Watch Now</span>
            </button>

            <button className="flex items-center space-x-3 bg-gray-700/50 backdrop-blur-xl border border-white/20 text-white px-6 py-4 rounded-lg font-semibold hover:bg-gray-600/50 transition-all duration-300">
              <Info size={20} />
              <span>More Info</span>
            </button>

            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setIsLiked(!isLiked)}
                className={`p-3 rounded-full backdrop-blur-xl border transition-all duration-300 ${
                  isLiked 
                    ? 'bg-red-500/20 border-red-500/30 text-red-500' 
                    : 'bg-black/20 border-white/10 text-white hover:bg-white/10'
                }`}
              >
                <Heart size={20} weight={isLiked ? "fill" : "regular"} />
              </button>

              <button className="p-3 rounded-full bg-black/20 backdrop-blur-xl border border-white/10 text-white hover:bg-white/10 transition-all duration-300">
                <ChatCircle size={20} />
              </button>

              <button className="p-3 rounded-full bg-black/20 backdrop-blur-xl border border-white/10 text-white hover:bg-white/10 transition-all duration-300">
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
