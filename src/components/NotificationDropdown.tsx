
import React from 'react';
import { Heart, MessageCircle, UserPlus, Play } from 'phosphor-react';

interface NotificationDropdownProps {
  onClose: () => void;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ onClose }) => {
  const notifications = [
    {
      id: 1,
      type: 'like',
      icon: Heart,
      user: 'john_doe',
      action: 'liked your video',
      time: '2m ago',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 2,
      type: 'comment',
      icon: MessageCircle,
      user: 'sarah_tech',
      action: 'commented on your video',
      time: '5m ago',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b8c8e04e?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 3,
      type: 'follow',
      icon: UserPlus,
      user: 'creator_zim',
      action: 'started following you',
      time: '1h ago',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 4,
      type: 'video',
      icon: Play,
      user: 'music_lover',
      action: 'shared your video',
      time: '3h ago',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face'
    }
  ];

  return (
    <>
      <div 
        className="fixed inset-0 z-40" 
        onClick={onClose}
      />
      <div className="absolute right-0 top-12 w-80 bg-black/40 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl animate-fade-in z-50 overflow-hidden">
        <div className="p-4 border-b border-white/10">
          <h3 className="text-lg font-semibold text-white">Notifications</h3>
        </div>
        <div className="max-h-96 overflow-y-auto scrollbar-hide">
          {notifications.map((notification) => {
            const IconComponent = notification.icon;
            return (
              <div key={notification.id} className="p-4 border-b border-white/5 hover:bg-white/5 transition-all duration-300">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img 
                      src={notification.avatar} 
                      alt={notification.user}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <IconComponent size={12} className="text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm">
                      <span className="font-semibold">{notification.user}</span>
                      <span className="text-gray-300 ml-1">{notification.action}</span>
                    </p>
                    <p className="text-gray-400 text-xs mt-1">{notification.time}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="p-4 border-t border-white/10">
          <button className="w-full text-center text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors">
            View all notifications
          </button>
        </div>
      </div>
    </>
  );
};

export default NotificationDropdown;
