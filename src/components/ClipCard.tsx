
import React, { useState } from 'react';
import { Heart, ChatCircle, Play, Eye } from 'phosphor-react';

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

interface ClipCardProps {
  clip: Clip;
  onPlay: () => void;
}

const ClipCard: React.FC<ClipCardProps> = ({ clip, onPlay }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div 
      className="relative flex-shrink-0 w-72 md:w-80 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:z-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Clip Thumbnail */}
      <div className="relative">
        <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-800">
          <img 
            src={clip.thumbnail} 
            alt={clip.title}
            className="w-full h-full object-cover"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          
          {/* Duration Badge */}
          <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
            {clip.duration}
          </div>

          {/* Category Badge */}
          <div className="absolute top-3 left-3 bg-gradient-to-r from-green-400/20 to-yellow-400/20 backdrop-blur-sm border border-white/20 text-white text-xs px-2 py-1 rounded">
            {clip.category}
          </div>
          
          {/* Play Button Overlay */}
          {isHovered && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 animate-fade-in">
              <button 
                onClick={onPlay}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-xl border border-white/30 text-white p-4 rounded-full transition-all duration-300 hover:scale-110"
              >
                <Play size={32} weight="fill" />
              </button>
            </div>
          )}

          {/* Bottom Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white font-semibold text-lg mb-1 line-clamp-2">{clip.title}</h3>
            <p className="text-white/80 text-sm mb-2">@{clip.author}</p>
          </div>
        </div>
      </div>

      {/* Expanded Info on Hover */}
      {isHovered && (
        <div className="absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-xl rounded-b-lg p-4 shadow-2xl z-20 animate-fade-in border border-gray-700/50">
          <div className="space-y-3">
            {/* Stats Row */}
            <div className="flex items-center justify-between text-sm text-gray-300">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Eye size={16} />
                  <span>{clip.views}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Heart size={16} className={isLiked ? "text-red-500" : ""} />
                  <span>{clip.likes}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ChatCircle size={16} />
                  <span>{clip.comments}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              <button 
                onClick={onPlay}
                className="flex-1 bg-white text-black py-2 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
              >
                <Play size={16} weight="fill" />
                <span>Watch</span>
              </button>
              
              <button 
                onClick={() => setIsLiked(!isLiked)}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  isLiked 
                    ? 'bg-red-500/20 border border-red-500/30 text-red-500' 
                    : 'bg-gray-700 hover:bg-gray-600 text-white'
                }`}
              >
                <Heart size={16} weight={isLiked ? "fill" : "regular"} />
              </button>
              
              <button className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
                <ChatCircle size={16} />
              </button>
            </div>

            {/* Description */}
            <p className="text-gray-400 text-sm line-clamp-2">
              Amazing {clip.category.toLowerCase()} content from {clip.author}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClipCard;
