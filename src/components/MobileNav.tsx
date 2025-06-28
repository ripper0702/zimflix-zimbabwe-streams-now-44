
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
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 px-4 py-2 z-50">
      <div className="flex justify-around items-center">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              onClick={handleNavClick}
              className="flex flex-col items-center py-2 px-3"
            >
              <Icon 
                size={24} 
                weight={isActive ? "fill" : "regular"}
                className={isActive ? "text-white" : "text-gray-400"}
              />
              <span className={`text-xs mt-1 ${isActive ? "text-white" : "text-gray-400"}`}>
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
