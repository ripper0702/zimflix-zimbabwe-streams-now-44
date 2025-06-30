
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
  comments?: Comment[];
  onClose: () => void;
  isVisible?: boolean;
}

const CommentsView: React.FC<CommentsViewProps> = ({ 
  clip, 
  comments = [], 
  onClose, 
  isVisible = false 
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [newComment, setNewComment] = useState('');

  const handleSubmitComment = () => {
    if (newComment.trim()) {
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
    };

    if (isVisible) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      modalRef.current?.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-lg max-h-[85vh] bg-black/40 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl animate-fadeIn z-50 overflow-hidden"
        ref={modalRef}
        tabIndex={-1}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 bg-black/20">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-white truncate">{clip.title}</h2>
              <p className="text-gray-400 text-sm mt-1">{clip.comments} comments</p>
            </div>
            <button
              className="text-white hover:text-gray-400 transition-colors p-2 ml-4 flex-shrink-0 hover:bg-white/10 rounded-full"
              onClick={onClose}
            >
              <X size={24} />
            </button>
          </div>
        </div>
        
        {/* Comments list */}
        <div className="flex-1 max-h-96 overflow-y-auto scrollbar-hide">
          {comments && comments.length > 0 ? (
            comments.map((comment) => (
              <CommentItem
                key={comment.id}
                user={comment.user}
                avatar={comment.avatar}
                text={comment.text}
                timestamp={comment.timestamp}
                likes={comment.likes}
              />
            ))
          ) : (
            <div className="text-center text-gray-400 py-12 px-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/5 rounded-full flex items-center justify-center">
                <Send size={24} className="text-gray-500" />
              </div>
              <p className="text-lg font-medium mb-2">No comments yet</p>
              <p className="text-sm text-gray-500">Be the first to share your thoughts!</p>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentsView;
