
import React, { useState } from 'react';
import { Bell } from 'phosphor-react';
import SoundToggle from './SoundToggle';
import NotificationDropdown from './NotificationDropdown';

const TopBar = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-black/20 backdrop-blur-xl border-b border-white/10">
      <div className="flex items-center">
        <h1 className="text-xl font-bold bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 bg-clip-text text-transparent">
          ZimFlix
        </h1>
      </div>
      
      <div className="flex items-center space-x-3 relative">
        <SoundToggle />
        <div className="relative">
          <button 
            className="p-2 relative"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell size={24} className="text-white" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          </button>
          {showNotifications && <NotificationDropdown onClose={() => setShowNotifications(false)} />}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
