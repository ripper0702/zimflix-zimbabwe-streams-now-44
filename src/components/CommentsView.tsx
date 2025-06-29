import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { X } from 'lucide-react';
import CommentItem from './CommentItem';

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

interface CommentsViewProps {
  clip: Clip;
  comments: Comment[];
  onClose: () => void;
  isVisible?: boolean;
}

const CommentsView: React.FC<CommentsViewProps> = ({ clip, comments, onClose, isVisible = false }) => {
const [isOpen, setIsOpen] = useState(isVisible);

  useEffect(() => {
    setIsOpen(isVisible);
  }, [isVisible]);

  return ReactDOM.createPortal(
    <div
      className={`fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-end transition-transform duration-300 ${isOpen ? 'translate-y-0' : 'translate-y-full'}`} 
      onClick={onClose}
    >
      <div className="w-full max-h-[70vh] md:max-h-[80vh] bg-gray-900 rounded-t-2xl shadow-xl overflow-y-auto relative" onClick={e => e.stopPropagation()}>
        {/* Drag indicator */}
        <div className="h-1.5 w-12 bg-gray-500 rounded-full mx-auto mt-3 mb-4" />
        
        {/* Sticky header */}
        <div className="sticky top-0 bg-gray-900 px-6 py-4 border-b border-gray-700 z-10">
          <div className="flex items-center justify-between">
            <div className="flex-1 pr-4">
              <h2 className="text-xl font-bold text-white truncate">{clip.title}</h2>
              <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                <span>{clip.views} views</span>
                <span>•</span>
                <span>{clip.likes} likes</span>
                <span>•</span>
                <span>{clip.comments} comments</span>
              </div>
            </div>
            <button
              className="text-white hover:text-gray-400 transition-colors p-2 -mr-2"
              onClick={onClose}
            >
              <X size={24} />
            </button>
          </div>
        </div>
        
        {/* Comments list */}
        <div className="px-6 pb-6 space-y-4">
          {comments.map(({ id, user, avatar, text, timestamp, likes }) => (
            <CommentItem
              key={id}
              user={user}
              avatar={avatar}
              text={text}
              timestamp={timestamp}
              likes={likes}
            />
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default CommentsView;
