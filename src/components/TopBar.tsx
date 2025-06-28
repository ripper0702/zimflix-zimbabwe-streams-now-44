
import React from 'react';
import { MagnifyingGlass, Bell } from 'phosphor-react';
import SoundToggle from './SoundToggle';

const TopBar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-black/80 backdrop-blur-sm">
      <div className="flex items-center">
        <h1 className="text-xl font-bold bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 bg-clip-text text-transparent">
          ZimFlix
        </h1>
      </div>
      
      <div className="flex items-center space-x-3">
        <button className="p-2">
          <MagnifyingGlass size={24} className="text-white" />
        </button>
        <SoundToggle />
        <button className="p-2">
          <Bell size={24} className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default TopBar;
