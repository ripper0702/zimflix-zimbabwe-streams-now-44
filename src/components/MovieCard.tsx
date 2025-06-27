
import React, { useState } from 'react';
import { Play, Plus, ThumbsUp, ChevronDown } from 'lucide-react';

interface Movie {
  id: number;
  title: string;
  image: string;
  genre: string;
  year: string;
}

interface MovieCardProps {
  movie: Movie;
  onPlay?: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onPlay }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handlePlayClick = () => {
    if (onPlay) {
      onPlay();
    }
  };

  return (
    <div 
      className="relative flex-shrink-0 w-64 md:w-72 cursor-pointer transform transition-all duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Movie Poster */}
      <div className="relative">
        <img 
          src={movie.image} 
          alt={movie.title}
          className="w-full h-36 md:h-40 object-cover rounded-lg"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-lg"></div>
        
        {/* Play Button Overlay */}
        {isHovered && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg animate-fade-in">
            <button 
              onClick={handlePlayClick}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all"
            >
              <Play className="w-6 h-6 fill-current" />
            </button>
          </div>
        )}
      </div>

      {/* Movie Info */}
      <div className="mt-2 space-y-1">
        <h3 className="text-white font-semibold truncate">{movie.title}</h3>
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <span>{movie.year}</span>
          <span>•</span>
          <span>{movie.genre}</span>
        </div>
      </div>

      {/* Expanded Info on Hover */}
      {isHovered && (
        <div className="absolute top-full left-0 right-0 bg-gray-900 rounded-b-lg p-4 shadow-2xl z-20 animate-fade-in border border-gray-700">
          <div className="space-y-3">
            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              <button 
                onClick={handlePlayClick}
                className="bg-white text-black p-2 rounded-full hover:bg-gray-200 transition-colors"
              >
                <Play className="w-4 h-4 fill-current" />
              </button>
              <button className="bg-gray-700 text-white p-2 rounded-full hover:bg-gray-600 transition-colors">
                <Plus className="w-4 h-4" />
              </button>
              <button className="bg-gray-700 text-white p-2 rounded-full hover:bg-gray-600 transition-colors">
                <ThumbsUp className="w-4 h-4" />
              </button>
              <button className="bg-gray-700 text-white p-2 rounded-full hover:bg-gray-600 transition-colors ml-auto">
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Match Score */}
            <div className="text-green-400 text-sm font-semibold">
              {Math.floor(Math.random() * 20) + 80}% Match
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-1">
              <span className="text-xs text-gray-300 bg-gray-800 px-2 py-1 rounded">
                {movie.genre}
              </span>
              <span className="text-xs text-gray-300 bg-gray-800 px-2 py-1 rounded">
                HD
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
