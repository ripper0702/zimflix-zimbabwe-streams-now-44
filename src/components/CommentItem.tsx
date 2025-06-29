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
    <div className="flex space-x-4 bg-gray-800 p-4 rounded-lg">
      <Avatar>
        <AvatarImage src={avatar} alt={user} />
        <AvatarFallback>{user.slice(0, 2)}</AvatarFallback>
      </Avatar>
      <div className="text-gray-200">
        <div className="flex justify-between items-center">
          <p className="font-semibold">{user}</p>
          <button className="flex items-center text-gray-400 hover:text-red-500 transition-colors">
            <Heart className="mr-1" size={16} /> {likes}
          </button>
        </div>
        <p className="text-sm mt-1">{text}</p>
        <p className="text-xs text-gray-500 mt-1">{formatRelativeTime(timestamp)}</p>
      </div>
    </div>
  );
};

export default CommentItem;
