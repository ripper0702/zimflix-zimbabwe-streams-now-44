import React, { useEffect, useRef, useState } from 'react';
import { X, Send } from 'lucide-react';
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
  const modalRef = useRef<HTMLDivElement>(null);
  const [newComment, setNewComment] = useState('');

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      // TODO: Add comment submission logic here
      console.log('New comment:', newComment);
      setNewComment('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmitComment();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }

      if (event.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            event.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            event.preventDefault();
          }
        }
      }
    };

    if (isVisible) {
      document.addEventListener('keydown', handleKeyDown);
      modalRef.current?.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <>
      <div 
        className="fixed inset-0 z-40" 
        onClick={onClose}
      />
      <div 
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[80vh] bg-black/40 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl animate-fadeIn z-50 overflow-hidden"
        ref={modalRef}
        tabIndex={-1}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-white truncate">{clip.title}</h2>
            </div>
            <button
              className="text-white hover:text-gray-400 transition-colors p-2 ml-4 flex-shrink-0"
              onClick={onClose}
            >
              <X size={24} />
            </button>
          </div>
        </div>
        
        {/* Comments list */}
        <div className="max-h-96 overflow-y-auto scrollbar-hide">
          {comments && comments.length > 0 ? (
            comments.map(({ id, user, avatar, text, timestamp, likes }) => (
              <CommentItem
                key={id}
                user={user}
                avatar={avatar}
                text={text}
                timestamp={timestamp}
                likes={likes}
              />
            ))
          ) : (
            <div className="text-center text-gray-400 py-8 px-6">
              <p>No comments yet. Be the first to comment!</p>
            </div>
          )}
        </div>
        
        {/* Footer - Add Comment */}
        <div className="p-4 border-t border-white/10 bg-black/20 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add a comment..."
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 resize-none min-h-[44px] max-h-[120px] focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                rows={1}
              />
            </div>
            <button
              onClick={handleSubmitComment}
              disabled={!newComment.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-colors flex items-center justify-center min-w-[44px]"
            >
              <Send size={18} />
            </button>
          </div>
          <div className="flex justify-between items-center mt-2 text-xs text-gray-400">
            <span>Press Enter to send, Shift+Enter for new line</span>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors px-2 py-1 rounded"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentsView;
