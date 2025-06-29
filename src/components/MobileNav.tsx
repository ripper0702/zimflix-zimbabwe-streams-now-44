
import React from 'react';
import { House, MagnifyingGlass, Plus, Heart, User } from 'phosphor-react';
import { Link, useLocation } from 'react-router-dom';
import { useSoundContext } from '../contexts/SoundContext';

const MobileNav = () => {
  const location = useLocation();
  const { playClickSound } = useSoundContext();

  const navItems = [
    { icon: House, label: 'Home', path: '/' },
    { icon: MagnifyingGlass, label: 'Search', path: '/search' },
    { icon: Plus, label: 'Upload', path: '/upload' },
    { icon: Heart, label: 'Likes', path: '/likes' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  const handleNavClick = () => {
    playClickSound();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/30 backdrop-blur-2xl border-t border-white/10 z-50 safe-area-inset-bottom">
      <div className="flex justify-around items-center px-2 py-3">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              onClick={handleNavClick}
              className="flex flex-col items-center py-2 px-3 transition-all duration-300 min-w-[60px]"
            >
              <div className={`p-3 rounded-2xl transition-all duration-300 ${
                isActive 
                  ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 backdrop-blur-xl border border-white/30 shadow-lg' 
                  : 'hover:bg-white/10'
              }`}>
                <Icon 
                  size={24} 
                  weight={isActive ? "fill" : "regular"}
                  className={`transition-all duration-300 ${
                    isActive ? "text-white scale-110" : "text-gray-300"
                  }`}
                />
              </div>
              <span className={`text-xs mt-1 transition-all duration-300 font-medium ${
                isActive ? "text-white scale-105" : "text-gray-400"
              }`}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNav;
