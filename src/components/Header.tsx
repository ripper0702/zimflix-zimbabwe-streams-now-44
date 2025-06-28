
import React, { useState } from 'react';
import { Search, Bell, User, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import SoundToggle from './SoundToggle';
import { useSoundContext } from '../contexts/SoundContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const { playHoverSound, playClickSound } = useSoundContext();

  const isActive = (path: string) => location.pathname === path;

  const handleLinkClick = () => {
    playClickSound();
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-8">
          <Link to="/" onClick={handleLinkClick}>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 bg-clip-text text-transparent">
              ZimFlix
            </h1>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link 
              to="/" 
              className={`transition-colors ${isActive('/') ? 'text-white' : 'text-gray-400 hover:text-white'}`}
              onClick={handleLinkClick}
              onMouseEnter={playHoverSound}
            >
              Home
            </Link>
            <Link 
              to="/movies" 
              className={`transition-colors ${isActive('/movies') ? 'text-white' : 'text-gray-400 hover:text-white'}`}
              onClick={handleLinkClick}
              onMouseEnter={playHoverSound}
            >
              Movies
            </Link>
            <Link 
              to="/tv-shows" 
              className={`transition-colors ${isActive('/tv-shows') ? 'text-white' : 'text-gray-400 hover:text-white'}`}
              onClick={handleLinkClick}
              onMouseEnter={playHoverSound}
            >
              TV Shows
            </Link>
            <Link 
              to="/documentaries" 
              className={`transition-colors ${isActive('/documentaries') ? 'text-white' : 'text-gray-400 hover:text-white'}`}
              onClick={handleLinkClick}
              onMouseEnter={playHoverSound}
            >
              Documentaries
            </Link>
            <Link 
              to="/my-list" 
              className={`transition-colors ${isActive('/my-list') ? 'text-white' : 'text-gray-400 hover:text-white'}`}
              onClick={handleLinkClick}
              onMouseEnter={playHoverSound}
            >
              My List
            </Link>
          </nav>
        </div>

        {/* Right side controls */}
        <div className="flex items-center space-x-4">
          {/* Search - Desktop */}
          <div className="hidden md:flex items-center">
            {isSearchOpen ? (
              <div className="flex items-center bg-black/50 border border-gray-600 rounded px-3 py-2">
                <input
                  type="text"
                  placeholder="Titles, people, genres"
                  className="bg-transparent outline-none text-white w-64"
                  autoFocus
                />
                <button onClick={() => setIsSearchOpen(false)}>
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            ) : (
              <button onClick={() => setIsSearchOpen(true)}>
                <Search className="w-6 h-6 text-white hover:text-gray-300 transition-colors" />
              </button>
            )}
          </div>

          {/* Mobile Search */}
          <button className="md:hidden">
            <Search className="w-6 h-6 text-white" />
          </button>

          {/* Sound Toggle */}
          <SoundToggle />

          {/* Notifications */}
          <button className="hidden md:block">
            <Bell className="w-6 h-6 text-white hover:text-gray-300 transition-colors" />
          </button>

          {/* Profile */}
          <button className="hidden md:block">
            <User className="w-6 h-6 text-white hover:text-gray-300 transition-colors" />
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 py-4 bg-black/90 rounded-lg animate-fade-in">
          <nav className="flex flex-col space-y-4 px-4">
            <Link 
              to="/" 
              className={`transition-colors ${isActive('/') ? 'text-white' : 'text-gray-400 hover:text-green-400'}`}
              onClick={handleLinkClick}
            >
              Home
            </Link>
            <Link 
              to="/movies" 
              className={`transition-colors ${isActive('/movies') ? 'text-white' : 'text-gray-400 hover:text-green-400'}`}
              onClick={handleLinkClick}
            >
              Movies
            </Link>
            <Link 
              to="/tv-shows" 
              className={`transition-colors ${isActive('/tv-shows') ? 'text-white' : 'text-gray-400 hover:text-green-400'}`}
              onClick={handleLinkClick}
            >
              TV Shows
            </Link>
            <Link 
              to="/documentaries" 
              className={`transition-colors ${isActive('/documentaries') ? 'text-white' : 'text-gray-400 hover:text-green-400'}`}
              onClick={handleLinkClick}
            >
              Documentaries
            </Link>
            <Link 
              to="/my-list" 
              className={`transition-colors ${isActive('/my-list') ? 'text-white' : 'text-gray-400 hover:text-green-400'}`}
              onClick={handleLinkClick}
            >
              My List
            </Link>
            <hr className="border-gray-700" />
            <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Account</a>
            <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Help Centre</a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
