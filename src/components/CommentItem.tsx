import React from 'react';
import { Heart } from '@phosphor-icons/react';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { formatRelativeTime } from '@/utils/timeUtils';

interface CommentItemProps {
  user: string;
  avatar: string;
  text: string;
  timestamp: Date;
  likes: number;
}

const CommentItem: React.FC<CommentItemProps> = ({ user, avatar, text, timestamp, likes }) => {
  return (
    <div className="p-4 border-b border-white/5 hover:bg-white/5 transition-all duration-300">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Avatar>
            <AvatarImage src={avatar} alt={user} />
            <AvatarFallback>{user.slice(0, 2)}</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex-1">
          <p className="text-white text-sm">
            <span className="font-semibold">{user}</span>
            <span className="ml-1">{text}</span>
          </p>
          <p className="text-gray-400 text-xs mt-1">{formatRelativeTime(timestamp)}</p>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
