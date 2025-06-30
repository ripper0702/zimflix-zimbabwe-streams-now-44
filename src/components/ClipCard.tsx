
import React, { useState } from 'react';
import { Heart, Share, Play, Eye, ChatCircle } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import CommentsView from './CommentsView';

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

interface Comment {
  id: string;
  user: string;
  avatar: string;
  text: string;
  timestamp: Date;
  likes: number;
}

interface ClipCardProps {
  clip: Clip;
  onPlay: () => void;
}

const ClipCard: React.FC<ClipCardProps> = ({ clip, onPlay }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showComments, setShowComments] = useState(false);

  // Mock comments data - in a real app, this would come from props or API
  const mockComments: Comment[] = [
    {
      id: '1',
      user: 'john_doe',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      text: 'This is hilarious! 😂',
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      likes: 12
    },
    {
      id: '2',
      user: 'sarah_comedy',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b8c8e04e?w=40&h=40&fit=crop&crop=face',
      text: 'Amazing content as always! Keep it up 👏',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      likes: 8
    }
  ];

  const handleInteraction = () => {
    if ('ontouchstart' in window) {
      setIsExpanded(!isExpanded);
    }
  };

  const handleCommentClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowComments(true);
  };

  return (
    <>
      <Link 
        to={`/clip/${clip.id}`}
        className="relative flex-shrink-0 w-64 sm:w-72 md:w-80 cursor-pointer group block transition-transform duration-300 hover:scale-105 hover:z-10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false)
          setIsExpanded(false)
        }}
        onClick={handleInteraction}
      >
        {/* Clip Thumbnail */}
        <div className="relative">
          <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-800 shadow-lg">
            <img 
              src={clip.thumbnail} 
              alt={clip.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            
            {/* Duration Badge */}
            <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
              {clip.duration}
            </div>

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100">
              <div className="bg-white/20 hover:bg-white/30 backdrop-blur-xl border border-white/30 text-white p-4 rounded-full transition-all duration-300 hover:scale-110">
                <Play size={32} weight="fill" />
              </div>
            </div>

            {/* Bottom Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-white font-bold text-md sm:text-lg mb-2 line-clamp-2">{clip.title}</h3>
              <p className="text-white/80 text-xs sm:text-sm">@{clip.author}</p>
            </div>
          </div>
        </div>

        {/* Expanded Info on Hover/Touch */}
        <div className={`absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-xl rounded-b-lg p-5 shadow-2xl z-20 border border-gray-700/50 transition-all duration-300 ease-in-out ${isHovered || isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
          <div className="space-y-4">
            {/* Stats Row */}
            <div className="flex items-center justify-between text-xs sm:text-sm text-gray-300">
              <div className="flex items-center space-x-3">
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
              <div className="flex-1 bg-white text-black py-2 px-3 rounded-md font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2 text-sm pointer-events-none">
                <Play size={16} weight="fill" />
                <span>Watch</span>
              </div>
              
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsLiked(!isLiked);
                }}
                className={`p-2 rounded-md transition-all duration-300 ${
                  isLiked 
                    ? 'bg-red-500/20 border border-red-500/30 text-red-500' 
                    : 'bg-gray-700 hover:bg-gray-600 text-white'
                }`}
              >
                <Heart size={16} weight={isLiked ? "fill" : "regular"} />
              </button>
              
              <button
                onClick={handleCommentClick}
                className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors"
              >
                <ChatCircle size={16} />
              </button>
            </div>
          </div>
        </div>
      </Link>

      {/* Comments Modal */}
      <CommentsView 
        clip={clip} 
        comments={mockComments} 
        onClose={() => setShowComments(false)} 
        isVisible={showComments}
      />
    </>
  );
};

export default ClipCard;
