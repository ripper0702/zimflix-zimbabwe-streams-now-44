
import React, { useState } from 'react';
import { Bell } from 'phosphor-react';
import SoundToggle from './SoundToggle';
import NotificationDropdown from './NotificationDropdown';

const TopBar = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-black/30 backdrop-blur-2xl border-b border-white/10 safe-area-inset-top">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 bg-clip-text text-transparent">
          ZimFlix
        </h1>
      </div>
      
      <div className="flex items-center space-x-4 relative">
        <SoundToggle />
        <div className="relative">
          <button 
            className="p-3 relative transition-all duration-300 hover:bg-white/10 rounded-full"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell size={24} className="text-white" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </button>
          {showNotifications && <NotificationDropdown onClose={() => setShowNotifications(false)} />}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
